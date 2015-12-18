'use strict';

const numberClass = '[object Number]';
const stringClass = '[object String]';
const arrayClass = '[object Array]';

let idStart = 0x0907;

/**
* 判断是否是数组
*/
const isArray = Array.isArray || function(value) {
  return Object.prototype.toString.call(value) == arrayClass;
};
/**
 * 判断是否是字符串
 */
const isString = (value) => {
  return typeof value === 'string' ||
    value && typeof value === 'object' && Object.prototype.toString.call(value) === stringClass || false;
};
/**
 * 判断是否是数值类型
 * @return {Boolean}
 */
const isNumber = (value) => {
  return typeof value === 'number' ||
          value && typeof value === 'object' && Object.prototype.toString.call(value) === numberClass || false;
};
/**
 * 获取一个惟一的id
 * @param {String} prefix 前缀
 * @return {String}
 */
const getUniqueId = (prefix) => {
  return (prefix || '_') + (idStart++);
};
/**
 * 获取数值类型的数组的范围
 * @param  {Array} ary 数组
 * @return {Object}     {min, max}
 */
const extent = (ary) => {
  return ary.reduce((result, entry) => {
    let min = Math.min.apply(null, entry);
    let max = Math.max.apply(null, entry);

    return {
      min: Math.min(min, result.min),
      max: Math.max(max, result.max)
    };
  }, {min: Infinity, max: -Infinity})
};

const range = (from, to) => {
  let result = [];
  let n = from;

  while (n < to) {
    result.push(n);
    n += 1;
  }

  return result;
};

/**
 * 获取百分比宽度
 * @param {Number} totalValue 100%所对应的值
 * @param {Number|String} percent 百分比
 * @return {Number}
 */
const getPercentValue = (percent, totalValue) => {
  let str = '' + percent;
  let index = str.indexOf('%');
  let value;

  if (index > 0) {
    value = totalValue * parseFloat(str.slice(0, index)) / 100;
  } else if (percent === +percent) {
    value = percent;
  }

  if (isNaN(value) || value > totalValue) {
    value = totalValue
  }

  return value;
};
const getElementOfObject = (obj) => {
  const keys = Object.keys(obj);

  return keys.length ? obj[keys[0]] : null;
};

const maxBy = (fn, a, b) => {
  return fn(a) > fn(b) ? a : b;
};

const toFixed = (num, fixed) => {
  if (fixed !== +fixed) {
    fixed = 0;
  }

  num = num.toFixed(fixed + 1);

  let sNum = num + ''
    , sep = sNum.split('.')
    , pint = parseInt(sep[0], 10) || 0
    , dec = '0'
    , res = '';

  if (sep[1] !== undefined && parseInt(sep[1], 10) !== 0) {
    dec = sep[1];
  }

  if (parseInt(dec, 10) !== 0) {
    let fDec = parseFloat('0.' + dec)
      // 对数据做舍零处理
      , fixedDec = Math.floor(fDec * Math.pow(10, fixed)) + ''
      , len = fixedDec.length;

    if (fixed !== 0) {
      if (len === (fixed + 1)) {
        res = [pint + 1, pad(fixed, '0')].join('.');
      } else if (len < fixed) {
        res = [pint, pad(fixed - len, '0') + fixedDec].join('.');
      } else {
        res = [pint, fixedDec.substring(0, fixed)].join('.');
      }
    } else {
      //res = fDec >= 0.5 ? (pint + 1) : pint;
      // 不做 round，全部舍去
      res = pint;
    }
  } else {
    if (fixed !== 0 && pint !== 0) {
      res = [pint, pad(fixed, '0')].join('.');
    } else {
      res = pint;
    }
  }

  return (res + '');
};

const toPercentage = (num, unit, max=99999) => {
  if (num !== +num) {
    return '-';
  }

  unit = unit || '%';

  let res = num || ''
    , fixedNum = toFixed(num * 100, 2)
    , fNum = parseFloat(fixedNum)
    , iNum = parseInt(fixedNum, 10);

  //if (fNum > 100000) {
  if (fNum > max) {
    res = '>' + max;
  } else {
    if (fNum === iNum) {
      res = iNum;
    } else {
      res = fixedNum;
    }
  }

  res += unit;

  return res;
};


export default {
  isArray, isNumber, isString,

  extent, maxBy,

  getUniqueId,

  range,

  getPercentValue,

  toFixed, toPercentage
};