/* eslint-disable no-undef */
/**
 * 复写同步缓存相关功能
 */
const setStorageSync = uni.setStorageSync;
const getStorageSync = uni.getStorageSync;
const removeStorageSync = uni.removeStorageSync;

uni.setStorageSync = (key, data) => {
    try {
        if ([null, undefined].includes(data)) {
            uni.removeStorageSync(key);
            return;
        }
        setStorageSync(key, data);
        console.log(`设置缓存 ${key} 成功`);
    } catch {
        console.error(`设置缓存 ${key} 失败`);
    }
};

uni.getStorageSync = key => {
    try {
        const data = getStorageSync(key);
        console.log(`获取缓存 ${key} 成功`);
        return data;
    } catch {
        console.error(`获取缓存 ${key} 失败`);
    }
};

uni.removeStorageSync = key => {
    try {
        removeStorageSync(key);
        console.log(`移除缓存 ${key} 成功`);
    } catch {
        console.error(`移除缓存 ${key} 失败`);
    }
};
