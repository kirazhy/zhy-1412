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
/**
 * 将文件大小进行单位转换
 * @param {Number} size 输入大小
 * @param {String} fromUnit 输入单位
 * @param {String} toUnit 输出单位
 * @param {Number} decimal 小数点精度
 * @returns {Number} 输出转换后的大小
 */
export const convertFileSize = (size, fromUnit = 'B', toUnit = 'MB', decimal = 2) => {
    // 支持的单位
    const units = {
        B: 1,
        KB: 1024,
        MB: 1024 ** 2,
        GB: 1024 ** 3,
        TB: 1024 ** 4,
        PB: 1024 ** 5
    };
    // 单位统一成大写
    fromUnit = fromUnit.toUpperCase();
    toUnit = toUnit.toUpperCase();
    // 检查单位是否有效
    if (
        !Object.prototype.hasOwnProperty.call(units, fromUnit)
        || !Object.prototype.hasOwnProperty.call(units, toUnit)
    ) throw new Error('不支持的单, 支持单位: B, KB, MB, GB, TB, PB');
    // 先转换成B，再转换成目标单位，再处理小数点，再转换成数字
    return +(size * units[fromUnit] / units[toUnit]).toFixed(decimal);
};
