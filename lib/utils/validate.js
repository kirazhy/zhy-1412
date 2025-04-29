// 手机号校验
export const isMobileValid = value => /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
// 身份证号校验
export const isIdCardValid = value => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value);
// 邮箱校验
// eslint-disable-next-line no-useless-escape
export const isEmailValid = value => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
// 验证码校验
export const isCodeValid = (value, length = 6) => new RegExp(`^\\d{${length}}$`).test(value);
