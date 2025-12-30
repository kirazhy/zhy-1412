// 解码arrayBuffer
export const arrayBufferDecoder = data => {
    try {
        // Uint8Array数组
        const uint8Array = new Uint8Array(data);
        // 未解码的数据
        const encodedString = String.fromCharCode.apply(null, uint8Array);
        // 解码数据
        const decodedString = decodeURIComponent(escape(encodedString));
        // 有时候两条data同时传了过来，用\n分割一下再过滤掉无效的
        const strings = decodedString.split('\n').filter(string => string.startsWith('data:'));
        // 提取data:之后的内容
        return strings.map(string => JSON.parse(string.split('data:')[1].trim()));
    } catch (err) {
        console.error('arrayBufferDecoder 转换失败=>', data, err);
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
/**
 * 格式化展示手机号
 * @param {String} phone 输入手机号
 * @param {String} spliter 分隔符
 * @param {Array} format 分割格式
 * @returns {String} 格式化后的手机号
 */
export const formatPhone = (phone, spliter = '-', format = [3, 4, 4]) => {
    if (!phone || !spliter || !format?.length) return phone;
    // 检查手机号长度是否足够
    const digits = format.reduce((total, num) => (total + num), 0);
    if (phone.length < digits) return phone;
    const results = [];
    let index = 0;
    for (const num of format) {
        results.push(phone.substring(index, index + num));
        index += num;
    }
    return results.join(spliter);
};
/**
 * 手机号脱敏
 * @param {String} phone 输入手机号
 * @param {Object} options 配置项
 * @param {Number} options.keepFirst 保留前几位
 * @param {Number} options.keepLast 保留后几位
 * @param {String} options.mask 脱敏字符
 * @returns {String} 脱敏手机号
 */
export const maskPhone = (phone, { keepFirst = 3, keepLast = 4, mask = '*' } = {}) => {
    // 号码太短不脱敏
    if (phone.length <= keepFirst + keepLast) return phone;
    return phone.substring(0, keepFirst)
        + mask.repeat(phone.length - keepFirst - keepLast)
        + phone.substring(phone.length - keepLast);
};
/**
 * 生成包含小写字母和数字的随机字符串
 * @param {Number} length 字符串长度
 * @param {Number} base 进制，16进制包含a-f，36进制包含所有小写字母
 * @returns {String} 随机字符串
 */
export const genRandomString = ({ length = 32, base = 16 } = {}) => Array
    .from({ length }, () => Math.floor(Math.random() * (base - 1)).toString(base)).join('');
