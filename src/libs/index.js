import { transform, isEqual, isObject } from 'lodash'

/**
 * 获取两个对象中不一样的部分
 * */
export function difference (object, base) {
  function changes (object, base) {
    return transform(object, function (result, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] = (isObject(value) && isObject(base[key])) ? changes(value, base[key]) : value
      }
    })
  }
  return changes(object, base)
}

/**
 * 数字金额转换中文大写金额
 * */
export function toChineseCash(sAmount) {
  if (!sAmount || isNaN(parseFloat(sAmount)) || parseFloat(sAmount) === 0) {
    return
  }
  let value = parseFloat(sAmount).toFixed(2).toString()
  let sCN_Num = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];
  let unit = ['圆', '万', '亿', '万'];
  let subunit = ['拾', '佰', '仟']
  let sCNzero = '零';
  let result = "";
  let iDotIndex = value.indexOf('.');
  let sBeforeDot = value.slice(0, iDotIndex);
  let sAfterDot = value.slice(iDotIndex);

  let len = sBeforeDot.length;
  //before dot
  let j = 0, k = 0; //j is use to subunit,k is use to unit
  let oldC = '3';
  let cc = '0';
  result = unit[0] + result;

  let oldHasN = false;
  let hasN = false;
  let allZero = true;

  for (let i = 0; i < len; i++) {
    if (j === 0 && i !== 0) {
      if (!hasN)
      {
        if ((k % 2) === 0) result = result.slice(1);
      }
      else
      {
        if (oldC === '0') result = sCNzero + result;
      }
      result = unit[k] + result;
      //oldC = '3';
      oldHasN = hasN;
      hasN = false;
    }
    cc = sBeforeDot.charAt(len - i - 1);
    if (oldC === '0' && cc !== oldC)
    {
      if (hasN) result = sCNzero + result;
    }
    if (cc !== '0')
    {
      if (j !== 0)
        result = subunit[j - 1] + result;
      let dig = '0';
      dig = sCN_Num[cc];

      if (dig === '0')
        return false;
      hasN = true;
      allZero = false;
      result = dig + result;
    }
    oldC = cc;
    j++;
    if (j === 4)
    {
      k++;
      j = 0;
    }
  }
  if (allZero) {
    result = "零圆";
  } else {
    let bb = 0;
    if (!hasN) {
      bb++;
      if (!oldHasN) {
        bb++;
      }
    }
    if (bb !== 0)
      result = result.slice(bb);
    if (result.charAt(0) === '零')
      result = result.slice(1);
  }

  //after dot
  sAfterDot = sAfterDot.slice(1);
  len = sAfterDot.length;
  let corn = ['0','0'];
  let cornunit = ['角', '分'];
  let dig = '0';
  corn[0] = sAfterDot.charAt(0);
  if (len > 1)
    corn[1] = sAfterDot.charAt(1);
  else
    corn[1] = '0';
  if ((corn[0] ===  '0') && (corn[1] === '0'))
    return result += '整';
  else
  if (allZero) result = "";
  for (let i = 0; i < 2; i++)
  {
    let curchar = corn[i];
    dig = sCN_Num[curchar];

    if (i===0)
    {
      if(result!==""||curchar!=='0')
        result += dig;
      if(curchar!=='0')
      {
        result += cornunit[0];
      }
    }
    if (i===1&&curchar!=='0') result = result+dig+cornunit[1];
  }
  return result;
}
