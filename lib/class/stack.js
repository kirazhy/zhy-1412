export default class Stack {
    #stack;
    constructor(...items) {
        this.#stack = [...items];
    }
    // 入栈
    push(...items) {
        return this.#stack.push(...items);
    }
    // 出栈
    pop() {
        return this.#stack.pop();
    }
    // 栈顶元素
    top() {
        return this.#stack[this.#stack.length - 1];
    }
    // 栈底元素
    bottom() {
        return this.#stack[0];
    }
    // 队列是否为空
    isEmpty() {
        return this.#stack.length === 0;
    }
    // 栈大小
    size() {
        return this.#stack.length;
    }
    // 清空栈
    clear() {
        this.#stack = [];
    }
}
