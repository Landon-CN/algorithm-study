/**
 * https://leetcode-cn.com/problems/count-and-say/
 * 遍历
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
  const countSayResult = ['', '1'];
  for (let i = 2; i <= n; i++) {
    const analyzeArr = [];
    for (let index = 0; index < countSayResult[i - 1].length; index++) {
      const element = countSayResult[i - 1][index];
      if (analyzeArr[analyzeArr.length - 1] && analyzeArr[analyzeArr.length - 1].key === element) {
        analyzeArr[analyzeArr.length - 1].count++;
      } else {
        analyzeArr.push({ key: element, count: 1 });
      }
    }
    const say = analyzeArr.reduce((previousValue, currentValue) => {
      return previousValue + `${currentValue.count}${currentValue.key}`;
    }, '');

    countSayResult.push(say);
  }
  return countSayResult[n];
};
