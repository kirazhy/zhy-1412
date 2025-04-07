/**
 * 有关路由的方法
 */
/**
 * 解析路由
 * @param {String} url /pages/index/index?id=123&name=test
 * @returns {Object} 路由path: /pages/index/index/; 路由入参query: { id: '123', name: 'test' }
 */
export const parseUrl = url => {
    // 分割路径和参数
    const [path, queryString] = url.split('?');
    // 解析参数
    const query = {};
    if (queryString) {
        queryString.split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            query[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
    }
    return {
        path: path,
        query: query
    };
};
/**
 * 
 * @param {*} path 路由path: /pages/index/index/
 * @param {*} query 路由入参query: { id: '123', name: 'test' }
 * @returns /pages/index/index?id=123&name=test
 */
export const stringifyUrl = (path, query) => {
    if (!query) return path;
    const queryString = Object.keys(query)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
    return queryString ? `${path}?${queryString}` : path;
};
