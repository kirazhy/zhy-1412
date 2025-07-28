export default class ListNode {
    constructor(val, next) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
    // 链表的中间结点-如果有两个中间结点，则返回第二个中间结点
    middle() {
        let slow = this;
        let fast = this;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
    /**
     * 删除链表第n个节点，或倒数第n个节点
     * @param {Number} num 删除节点的索引，正数表示从头开始，负数表示从尾开始
     * @returns {ListNode} 删除后的链表头节点
     */
    delete(num) {
        if (num === 0) return this;
        const dummy = new ListNode(0, this);
        if (num > 0) {
            let node = dummy;
            for (let index = 1; index < num; index++) {
                 // 如果链表长度小于num，直接返回头节点
                if (!node.next) return dummy.next;
                node = node.next;
            }
            node.next = node.next.next;
        } else {
            let left = dummy;
            let right = dummy;
            // right比left超前n个节点
            for (let index = 0; index < Math.abs(num); index++) {
                right = right.next;
            }
            // 双指针同时推进，当right遍历到链表的末尾时
            while (right && right.next) {
                left = left.next;
                right = right.next;
            }
            // left就恰好处于倒数第n个节点
            left.next = left.next.next;
        }
        return dummy.next;
    }
    /**
     * 判断链表是否有环
     * @description 快慢指针法，快指针每次走两步，慢指针每次走一步，如果有环，则快指针会追上慢指针
     * @returns {Boolean} true表示有环，false表示无环
     */
    hasCycle() {
        if (!this || !this.next) return false;
        // 定义两个指针，一快一慢
        let fast = this;
        let slow = this;
        do {
            // 快指针将到达链表尾部，该链表不为环形链表
            if (!fast || !fast.next) return false;
            // 慢指针每次只移动一步，而快指针每次移动两步
            slow = slow.next;
            fast = fast.next.next;
        } while (fast !== slow);
        // 如果在移动的过程中，快指针反过来追上慢指针，就说明该链表为环形链表
        return true;
    }
    // 反转链表
    reverse() {
        let node = this;
        let prev = null;
        while (node) {
            // 存储next
            const next = node.next;
            // 将next指向前面
            node.next = prev;
            // 前面向后推一位
            prev = node;
            // 当前向后推一位
            node = next;
        }
        return prev;
    }
    /**
     * 反转链表的区间 [left, right)
     * @param {Number} left 反转区间的左边界
     * @param {Number} right 反转区间的右边界
     * @returns 
     */
    reverseBetween(left, right) {
        const dummy = new ListNode(0, this);
        let prev = dummy;
        // 走left - 1步将prev放到区间之前节点
        for (let index = 0; index < left - 1; index++) {
            prev = prev.next;
        }
        // 从区间第一节点开始
        let node = prev.next;
        // 将cur.next放到prev.next
        for (let index = left; index < right; index++) {
            const next = node.next;
            node.next = next.next;
            next.next = prev.next;
            prev.next = next;
        }
        return dummy.next;
    }
    /**
     * 插入排序链表
     * @returns {ListNode} 插入排序后的链表
     */
    insertSort() {
        const dummy = new ListNode(0, this);
        // 当前待插入元素的前一个节点，即有序链表的最后一个节点
        let last = this,
            // 待插入元素
            node = this.next;
        // 遍历链表，直到没有待插入元素
        while (node) {
            // 如果待插入元素大于等于有序链表的最后一个元素，则直接插入到有序链表的末尾
            if (last.val <= node.val) {
                last = last.next;
            } else {
                // 从有序链表中遍历查找插入位置
                let prev = dummy;
                while (prev.next.val <= node.val) {
                    prev = prev.next;
                }
                // 插入待插入元素
                last.next = node.next;
                node.next = prev.next;
                prev.next = node;
            }
            node = last.next; // 更新待插入元素
        }
        return dummy.next;
    }
}
