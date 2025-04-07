export const genRequestLog = response => {
    const {
        rawData: {result: {code, message} = {}, data: resData} = {},
        config: {url, method, header, data: postData, params},
        errMsg, statusCode
    } = response;
    console.log(`↓↓↓↓↓↓↓↓↓↓接口${url}信息↓↓↓↓↓↓↓↓↓↓`);
    console.log('请求方法=>', method);
    console.log('请求头=>', header);
    console.log('请求参数=>', method === 'POST' ? postData : params);
    console.log('返回值=>', resData);
    console.log('返回状态码=>', statusCode);
    console.log('返回结果码=>', code);
    console.log('返回信息=>', message || errMsg);
    console.log(`↑↑↑↑↑↑↑↑↑↑接口${url}信息↑↑↑↑↑↑↑↑↑↑`);
};
