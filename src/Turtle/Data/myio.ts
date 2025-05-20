import axios from "axios";

let RECONNECT_TIMEOUT: any = null

export default class Myio {
    url = ""
    namespace = "my.io"
    socket: WebSocket | any = null
    eventHandlers = {}
    ackHandlers = {}
    ackId = 0
    reconnectionAttempts = 0
    reconnectInterval = 1000 // Initial reconnect delay in ms

    reconnecting = false

    constructor(url?: string) {
        this.url = url ?? ""
    }

    async connectToRoom(roomName: string) {
        await axios.post("/my.io/conn", null, {
            params: {
                room: roomName,
                who: "xyz"
            }
        })
    }


    connect() {
        console.log(
            "goin to connectio to websocket: ",
            `${this.url}/${this.namespace}`
        )

        this.socket = new WebSocket(this.namespace)

        this.socket.onopen = () => {
            console.log("Connected to WebSocket server.")
            if (RECONNECT_TIMEOUT) {
                clearTimeout(RECONNECT_TIMEOUT)
            }
            this.reconnectionAttempts = 0 // Reset on successful connection
            this.reconnecting = false
        }

        this.socket.onmessage = (event) => {
            this._handleMessage(event.data)
        }

        this.socket.onclose = () => {
            console.error("Disconnected from WebSocket server.")
            this._attemptReconnection()
        }

        this.socket.onerror = (error) => {
            console.error("WebSocket Error: ", error)

            // if (this.reconnecting == false) {
            //     this._attemptReconnection();
            // }
        }

        console.log("After connect")
    }

    disconnect() {
        this.socket.close()
    }

    _handleMessage(data) {

        console.log(data)
        try {
            const parsedData = JSON.parse(data)

            if (parsedData.event && this.eventHandlers[parsedData.event]) {
                // Handle events with or without acknowledgment
                const handlers = this.eventHandlers[parsedData.event]

                if (parsedData.ackId !== undefined) {
                    handlers.forEach((handler) =>
                        handler(parsedData.data, (ackData) => {
                            this.socket.send(
                                JSON.stringify({
                                    ackId: parsedData.ackId,
                                    ackData,
                                })
                            )
                        })
                    )
                } else {
                    //console.log(parsedData.data)
                    handlers.forEach((handler) => handler(parsedData.data))
                }
            } else if (
                parsedData.ackId !== undefined &&
                this.ackHandlers[parsedData.ackId]
            ) {
                // Handle acknowledgment responses
                const ackHandler = this.ackHandlers[parsedData.ackId]
                ackHandler(parsedData.ackData)
                delete this.ackHandlers[parsedData.ackId] // Clean up ack handler
            }
        } catch (err) {
            console.error("Error parsing message:", err)
        }
    }

    IsOnline(): boolean {
        return this.reconnecting === false
    }

    _attemptReconnection() {
        this.reconnecting = true
        this.reconnectionAttempts += 1

        console.log(`Reconnecting attemp: ${this.reconnectionAttempts}`)

        RECONNECT_TIMEOUT = setTimeout(() => {
            this.connect()
        }, this.reconnectInterval)
    }

    on(event, handler) {
        // Register event handler
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = []
        }
        this.eventHandlers[event].push(handler)
    }

    off(event, listener) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event] = this.eventHandlers[event].filter(
                (func) => func !== listener
            )
        }
    }

    emit(event, data, ackCallback) {
        const message: any = {event, data}

        if (typeof ackCallback === "function") {
            // If an acknowledgment callback is provided
            this.ackId += 1
            message.ackId = this.ackId
            this.ackHandlers[this.ackId] = ackCallback
        }
        this.socket.send(JSON.stringify(message))
    }

    close() {
        this.socket.close()
    }
}
