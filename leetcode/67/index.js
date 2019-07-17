/**
 * https://leetcode-cn.com/problems/add-binary/
 */

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  let idxA = a.length - 1,
    idxB = b.length - 1;
  let sum = '';
  let carry = false;
  while (idxA >= 0 || idxB >= 0) {
    const eleA = idxA < 0 ? '0' : a[idxA--],
      eleB = idxB < 0 ? '0' : b[idxB--];
    if (eleA === '1' && eleB === '1') {
      if (carry) {
        sum = '1' + sum;
      } else {
        sum = '0' + sum;
      }
      carry = true;
    } else if (eleA === '1' || eleB === '1') {
      if (carry) {
        sum = '0' + sum;
      } else {
        sum = '1' + sum;
      }
    } else {
      if (carry) {
        sum = '1' + sum;
      } else {
        sum = '0' + sum;
      }
      carry = false;
    }
  }
  return carry ? '1' + sum : sum;
};

console.log(addBinary('11', '1'));
