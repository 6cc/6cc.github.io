2024/3/21 10:57:51
https://ai4s.gpt-666.com/#/chat/1710989706756

toString(36)为什么不能实现36以上进制

function convertToCustomBase(number, base) {
    const digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/';
    let result = '';

    do {
        result = digits.charAt(number % base) + result;
        number = Math.floor(number / base);
    } while (number > 0);

    return result;
}

// 获取当前日期
const currentDate = new Date();

// 将日期转换为毫秒数
const timestamp = currentDate.getTime();

// 将毫秒数转换为64进制
const base64Date = convertToCustomBase(timestamp, 64);

console.log(base64Date);
