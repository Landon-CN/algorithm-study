/**
 * https://leetcode-cn.com/problems/length-of-last-word/
 * 时间复杂度 O(n)
 * 空间复杂度 O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  let lastWordLength = 0;
  let wordLength = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      // 分词
      wordLength = 0;
    } else {
      wordLength++;
      lastWordLength = wordLength;
    }
  }
  if (wordLength === 0) {
    wordLength = lastWordLength;
  }
  return wordLength;
};

  var lengthOfLastWord = function(s) {
    let wordLength = 0;
    let trailBlank = true;
    for (let i = s.length - 1; i >= 0; i--) {
      if (trailBlank && s[i] === ' ') {
        //判断尾部空格
        continue;
      }
      trailBlank = false;
      if(s[i] === ' ') break;

      wordLength++;
    }

    return wordLength;
  };
