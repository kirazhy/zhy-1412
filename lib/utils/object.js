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
