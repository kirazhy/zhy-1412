export class Countdown {
    #second = 0;
    constructor(second) {
        this.#second = second;
        this.second = second;
    }
    start() {
        // 开始前先重置
        this.reset();
        this.counting = true;
        this.second = this.#second;
        return new Promise(resolve => this.timer = setInterval(() => {
            if (--this.second <= 0) resolve();
        }, 1e3));
    }
    reset() {
        if (this.timer) clearInterval(this.timer);
        this.counting = false;
    }
}
