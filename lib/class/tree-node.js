import Stack from './stack';
import Queue from './queue';
export class TreeNode {
    constructor(val, left, right) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
    // 前序(根左右)遍历二叉树
    preorderTraversal() {
        const results = [];
        // 将初始根放入堆栈
        const stack = new Stack(this);
        while (stack.size()) {
            // 取出第一个
            const node = stack.pop();
            // 推入当前值
            results.push(node.val);
            // 先推右后左，这样pop时就是先左后右了
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
        return results;
    }
    // 中序(左根右)遍历二叉树
    inorderTraversal() {
        const results = [];
        const stack = new Stack();
        let node = this;
        while (stack.size() || node) {
            if (node) {
                // 根节点入栈
                stack.push(node);
                // 下一个left
                node = node.left;        
            } else {
                // 没有left-开始弹出栈顶
                node = stack.pop();        
                results.push(node.val);
                // 下一个right
                node = node.right;
            }
        }
        return results;
    }
    // 后序(左右根)遍历二叉树
    postorderTraversal() {
        const results = [];
        // 将初始根放入堆栈
        const stack = new Stack(this);
        let node;
        while (stack.size()) {
            // 取出第一个
            node = stack.pop();
            // 推入当前值
            results.push(node.val);
            // 先推左后后，这样pop时就是先右后左了
            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
        }
        // 根右左翻转-得到左右根
        return results.reverse();
    }
    /**
     * 层序遍历二叉树
     * @param {Boolean} isFlatten 
     * @returns {Array} 二叉树的层序遍历结果
     * 1. 如果isFlatten为true，则返回一个一维数组，表示按层序遍历的节点值。
     * 2. 如果isFlatten为false，则返回一个二维数组，表示按层序遍历的节点值，每一层的节点值放在一个子数组中。
     */
    levelorderTraversal(isFlatten = false) {
        const results = [];
        // 队列初始化-推入根
        const queue = new Queue(this);
        if (isFlatten) {
            while (queue.size()) {
                // 只需要按顺序先入先出即可
                const node = queue.shift();
                results.push(node.val);
                // 每次推入的都是从左到右的
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);    
            }
        } else {
            while (queue.size()) {
                // 当前层的节点数
                const size = queue.size();
                // 推入一个空数组等待加入数据
                results.push([]);
                // 处理这一层所有节点
                for (let i = 0; i < size; i++) {
                    // 队列方法，先入先出，提取第一个
                    const node = queue.shift();
                    // results的最后一层推入值
                    results[results.length - 1].push(node.val);
                    // 按左右顺序推入队列下一层
                    if (node.left) queue.push(node.left);
                    if (node.right) queue.push(node.right);
                }
            }
        }
        return results;
    }
    // 反转二叉树
    invert() {
        const loop = (node) => {
            if (!node) return node;
            // 交换左右节点
            [node.left, node.right] = [loop(node.right), loop(node.left)];
            return node;
        };
        return loop(this);
    }
    // 判断二叉树是否对称
    isSymmetric() {
        const loop = (left, right) => {
            if (!left && !right) return true;
            if (!left || !right) return false;
            // 左右值相同 && 左右子树相等 && 右左子树相等
            return left.val === right.val
                && loop(left.left, right.right)
                && loop(left.right, right.left);
        };
        return loop(this.left, this.right);
    }
}
