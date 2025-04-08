export class Queue {
    #queue;
    constructor(...items) {
        this.#queue = [...items];
    }
    // 入队
    push(...items) {
        return this.#queue.push(...items);
    }
    // 出队
    shift() {
        return this.#queue.shift();
    }
    // 队首元素
    front() {
        return this.#queue[0];
    }
    // 队尾元素
    back() {
        return this.#queue[this.#queue.length - 1];
    }
    // 队列是否为空
    isEmpty() {
        return this.#queue.length === 0;
    }
    // 队列大小
    size() {
        return this.#queue.length;
    }
    // 清空队列
    clear() {
        this.#queue = [];
    }
}
