// 并查集
export default class UnionFind {
    constructor(size) {
        // 初始化：每个元素的父节点指向自己，秩（rank）为0
        this.parent = new Array(size).fill(0).map((val, index) => index);
        this.rank = new Array(size).fill(0);
    }

    // 查找根节点（带路径压缩优化）
    find(x) {
        // 路径压缩
        if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
        return this.parent[x];
    }

    // 合并两个集合（按秩合并优化）
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        // 已在同一集合
        if (rootX === rootY) return;
        // 按秩合并：将小树合并到大树下
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            // 秩相同时，合并后秩+1
            this.rank[rootX]++;
        }
    }

    // 检查两个元素是否连通
    isConnected(x, y) {
        return this.find(x) === this.find(y);
    }

    // 获取当前连通分量总数
    getCount() {
        const roots = new Set();
        for (let i = 0; i < this.parent.length; i++) roots.add(this.find(i));
        return roots.size;
    }
}
