// 深度克隆
export const deepClone = obj => {
    // obj不是对象-直接返回（同时也是递归结束条件）
    if (typeof obj !== 'object') return obj;
    // 简单方法-序列化反序列化
    if (window.JSON) return JSON.parse(JSON.stringify(obj));
    // 根据obj的类型不同而结果不同
    const result = obj.constructor === Object ? {} : [];
    // obj的每一项递归本方法
    Object.keys(obj).forEach(key => (result[key] = deepClone(obj[key])));
    return result;
};
/**
 * @description 将一维数组解析成树形结构
 * @description 适用于树形结构的数组，数组元素必须包含父子关系的键名
 * @description 哈希表法-时间复杂度O(n)
 * @param {Array} array - 数组
 * @param {String} idKey - 节点ID的键名，默认值为'id'
 * @param {String} parentKey - 父节点ID的键名，默认值为'parentId'
 * @param {String} childrenKey - 子节点的键名，默认值为'children'
 */
export const buildTreeFromArray = (array, idKey = 'id', parentKey = 'parentId', childrenKey = 'children') => {
    // 哈希表，用于存储每个节点的引用
    const map = new Map();
    // 存储根节点
    const roots = [];
    // 第一次遍历：创建所有节点的映射
    for (const item of array) {
        map.set(item[idKey], {...item, [childrenKey]: []});
    }
    // 第二次遍历：构建树结构
    for (const item of array) {
        const parentId = item[parentKey];
        if (!parentId) {
            // 如果没有父节点，说明是根节点
            roots.push(map.get(item[idKey]));
        } else if (map.has(parentId)) {
            // 如果有父节点，将其添加到父节点的 children 数组中
            const parent = map.get(parentId);
            parent[childrenKey].push(map.get(item[idKey]));
            map.set(parentId, parent);
        }
    }
    return roots;
};
// decodeURIComponent对象的所有值
export const decodeObject = object => {
    if (!object) return {};
    const result = {};
    for (const key in object) {
        try {
            result[key] = decodeURIComponent(object[key]);
        } catch {
            result[key] = object[key];
        }
    }
    return result;
};
