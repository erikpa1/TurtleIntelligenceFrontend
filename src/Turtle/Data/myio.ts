const RECONNECT_DELAY_MS = 1_000
const MAX_RECONNECT_DELAY_MS = 30_000

interface Message {
    event?: string
    data?: unknown
    ackId?: number
    ackData?: unknown
}

type Handler<T = unknown> = (data: T) => void
type AckCallback<T = unknown> = (ackData: T) => void

export default class Myio {
    private url: string
    private namespace = "my.io"
    private socket: WebSocket | null = null

    private eventHandlers: Record<string, Handler[]> = {}
    private ackHandlers: Record<number, AckCallback> = {}
    private ackId = 0

    private reconnecting = false
    private reconnectionAttempts = 0
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null

    /** Rooms this client has joined (so we can re-join after reconnect). */
    private joinedRooms: Set<string> = new Set()

    constructor(url?: string) {
        this.url = url ?? ""
    }

    // ─────────────────────────────────────────────
    //  Connection lifecycle
    // ─────────────────────────────────────────────

    connect(): void {
        const endpoint = `${this.url}/${this.namespace}`
        console.log("Connecting to WebSocket:", endpoint)

        this.socket = new WebSocket(endpoint)

        this.socket.onopen = () => {
            console.log("Connected to WebSocket server.")
            this._clearReconnectTimer()
            this.reconnectionAttempts = 0
            this.reconnecting = false

            // Re-join rooms from previous session
            for (const room of this.joinedRooms) {
                this._sendJoin(room)
            }
        }

        this.socket.onmessage = (event: MessageEvent) => {
            this._handleMessage(event.data as string)
        }

        this.socket.onclose = () => {
            console.warn("Disconnected from WebSocket server.")
            this._attemptReconnection()
        }

        this.socket.onerror = (error: Event) => {
            console.error("WebSocket error:", error)
            // onclose will fire right after; reconnection is handled there.
        }
    }

    disconnect(): void {
        this._clearReconnectTimer()
        this.reconnecting = false
        this.socket?.close()
    }

    isOnline(): boolean {
        return !this.reconnecting && this.socket?.readyState === WebSocket.OPEN
    }

    // ─────────────────────────────────────────────
    //  Room subscriptions
    // ─────────────────────────────────────────────

    /** Join an arbitrary named room. */
    joinRoom(room: string): void {
        this.joinedRooms.add(room)
        this._sendJoin(room)
    }

    /** Leave an arbitrary named room. */
    leaveRoom(room: string): void {
        this.joinedRooms.delete(room)
        this._sendLeave(room)
    }

    /**
     * Subscribe to a session room.
     * The server will route EmitToSession(sessionId, …) here.
     */
    joinSession(sessionId: string): void {
        const room = "session:" + sessionId
        this.joinedRooms.add(room)
        // Use the dedicated protocol event so the server indexes it properly.
        this._send({ event: "join:session", data: { sessionId } })
    }

    leaveSession(sessionId: string): void {
        const room = "session:" + sessionId
        this.joinedRooms.delete(room)
        this._sendLeave(room)
    }

    /**
     * Subscribe to a user room.
     * The server will route EmitToUser(userUid, …) here.
     */
    joinUser(userUid: string): void {
        const room = "user:" + userUid
        this.joinedRooms.add(room)
        this._send({ event: "join:user", data: { userUid } })
    }

    leaveUser(userUid: string): void {
        const room = "user:" + userUid
        this.joinedRooms.delete(room)
        this._sendLeave(room)
    }

    // ─────────────────────────────────────────────
    //  Event API
    // ─────────────────────────────────────────────

    on<T = unknown>(event: string, handler: Handler<T>): void {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = []
        }
        this.eventHandlers[event].push(handler as Handler)
    }

    off<T = unknown>(event: string, handler: Handler<T>): void {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event] = this.eventHandlers[event].filter(
                (fn) => fn !== (handler as Handler)
            )
        }
    }

    emit<T = unknown>(event: string, data: T, ackCallback?: AckCallback): void {
        const message: Message = { event, data }

        if (typeof ackCallback === "function") {
            this.ackId += 1
            message.ackId = this.ackId
            this.ackHandlers[this.ackId] = ackCallback
        }

        this._send(message)
    }

    // ─────────────────────────────────────────────
    //  Internal helpers
    // ─────────────────────────────────────────────

    private _send(msg: Message): void {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.warn("Socket not open; message dropped:", msg)
            return
        }
        this.socket.send(JSON.stringify(msg))
    }

    private _sendJoin(room: string): void {
        this._send({ event: "join", data: room })
    }

    private _sendLeave(room: string): void {
        this._send({ event: "leave", data: room })
    }

    private _handleMessage(raw: string): void {
        let parsed: Message
        try {
            parsed = JSON.parse(raw) as Message
        } catch (err) {
            console.error("Error parsing WebSocket message:", err)
            return
        }

        if (parsed.event && this.eventHandlers[parsed.event]) {
            const handlers = this.eventHandlers[parsed.event]

            if (parsed.ackId !== undefined) {
                handlers.forEach((handler) =>
                    handler(parsed.data)
                )
                // Send ack reply back to server
                this._send({ ackId: parsed.ackId, ackData: "ack" })
            } else {
                handlers.forEach((handler) => handler(parsed.data))
            }
        } else if (parsed.ackId !== undefined && this.ackHandlers[parsed.ackId]) {
            const ackHandler = this.ackHandlers[parsed.ackId]
            ackHandler(parsed.ackData)
            delete this.ackHandlers[parsed.ackId]
        }
    }

    private _attemptReconnection(): void {
        if (this.reconnecting) return
        this.reconnecting = true
        this.reconnectionAttempts += 1

        // Exponential backoff capped at MAX_RECONNECT_DELAY_MS
        const delay = Math.min(
            RECONNECT_DELAY_MS * 2 ** (this.reconnectionAttempts - 1),
            MAX_RECONNECT_DELAY_MS
        )

        console.log(
            `Reconnect attempt ${this.reconnectionAttempts} in ${delay}ms…`
        )

        this.reconnectTimer = setTimeout(() => {
            this.reconnecting = false // allow connect() to set it again
            this.connect()
        }, delay)
    }

    private _clearReconnectTimer(): void {
        if (this.reconnectTimer !== null) {
            clearTimeout(this.reconnectTimer)
            this.reconnectTimer = null
        }
    }
}