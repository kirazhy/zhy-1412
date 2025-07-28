export default class Countdown {
    // 保存初始化时传入的second
    #second = 0;
    constructor(second) {
        this.#second = second;
        this.second = second;
    }
    start() {
        // 开始前先重置
        this.reset();
        this.counting = true;
        // 初始化second
        this.second = this.#second;
        return new Promise(resolve => this.timer = setInterval(() => {
            if (--this.second <= 0) {
                this.reset();
                resolve();
            }
        }, 1e3));
    }
    reset() {
        if (this.timer) clearInterval(this.timer);
        this.counting = false;
    }
}
