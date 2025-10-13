// 获取H5 UserMedia
export const getH5UserMedia = (constraints, successCallback, errorCallback) => {
    if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(successCallback).catch(errorCallback);
    } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, successCallback, errorCallback)
    } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, successCallback, errorCallback);
    } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, successCallback, errorCallback);
    }
};
