/**
 * https://leetcode-cn.com/problems/maximum-subarray/
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let maxCount = nums[0];
  let tmpCount = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const ele = nums[i];
    if (tmpCount > 0) {
      tmpCount += ele;
    } else {
      tmpCount = ele;
    }

    maxCount = Math.max(maxCount, tmpCount);
  }
  return maxCount;
};
