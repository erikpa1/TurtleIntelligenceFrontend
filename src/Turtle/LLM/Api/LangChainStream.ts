// Frontend TypeScript to consume the streaming response

export interface StreamCallbacks {
    onToken?: (token: string) => void;
    onComplete?: () => void;
    onError?: (error: string) => void;
    onStart?: (message?: string) => void;
}

export class LangChainStreamer {
    private eventSource: EventSource | null = null;


    // Stream response with callbacks
    streamResponse(url: string, modelUid: string, prompt: string, callbacks: StreamCallbacks = {}): EventSource {
        const {
            onToken = (token: string) => console.log('Token:', token),
            onComplete = () => console.log('Complete'),
            onError = (error: string) => console.error('Error:', error),
            onStart = () => console.log('Started')
        } = callbacks;

        // Close existing connection
        this.close();


        const urlToAks = `${url}?modelUid=${modelUid}&text${prompt}` //encodeURIComponent()

        this.eventSource = new EventSource(urlToAks);

        this.eventSource.addEventListener('start', (event: MessageEvent) => {
            onStart(event.data);
        });

        this.eventSource.addEventListener('token', (event: MessageEvent) => {
            onToken(event.data);
        });

        this.eventSource.addEventListener('complete', (event: MessageEvent) => {
            onComplete();
            this.close();
        });

        this.eventSource.addEventListener('error', (event: MessageEvent) => {
            onError(event.data || 'Connection error');
            this.close();
        });

        this.eventSource.onerror = (event: Event) => {
            onError('SSE connection error');
            this.close();
        };

        return this.eventSource;
    }

    close(): void {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }
}
