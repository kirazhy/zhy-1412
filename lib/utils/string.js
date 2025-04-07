// 解码arrayBuffer
export const arrayBufferDecoder = data => {
    try {
        const uint8Array = new Uint8Array(data);
        let result = String.fromCharCode.apply(null, uint8Array);
        result = decodeURIComponent(escape(result));
        // 提取data:之后的内容
        if (result.includes('data:')) result = result.split('data:')[1].trim();
        return JSON.parse(result);
    } catch {
        return null;
    }
};
