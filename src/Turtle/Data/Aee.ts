class AnyEventEmmiter {

    events = {}

    isRunning = true

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(func => func !== listener);
        }
    }

    emit(event, data) {
        const evnt = this.events[event]
        if (evnt) {
            evnt.forEach(listener => {
                listener(data);
            });
        }
    }


}

const aee = new AnyEventEmmiter();
export default aee;