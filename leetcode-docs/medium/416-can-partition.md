---
id: 416-can-partition
title: 分割等和子集
sidebar_label: 416. 分割等和子集
keywords:
  - Dynamic Programming
---

:::success Tips
题目类型: Dynamic Programming
:::

## 题目

给你一个**只包含正整数**的**非空**数组 `nums`. 请你判断是否可以将这个数组分割成两个子集, 使得两个子集的元素和相等.

:::info 示例

```ts
输入: nums = [1,5,11,5]
输出: true
解释: 数组可以分割成 [1, 5, 5] 和 [11].
```

```ts
输入: nums = [1,2,3,5]
输出: false
解释: 数组不能分割成两个元素和相等的子集.
```

:::

## 题解

这道题可以转化成 [0-1 背包问题](/algorithm-design/dynamic-programming/pack#0-1-背包). 先给 `nums` 求和记为 `sum`, 因此这道题就变成了: 给你背包容量为 `sum / 2` 和 `n` 个物品, 每个物品的重量为 `nums[i]`, 现在让你装物品, 是否存在一种装法, 能够恰好将背包装满.

### 二维数组解法

```ts
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  let sum = nums.reduce((acc, val) => acc + val)
  if (sum % 2 === 1) return false
  const n = nums.length
  sum /= 2

  const dp = []
  for (let i = 0; i <= n; i++) {
    dp.push(new Array(sum + 1).fill(false))
    dp[i][0] = true
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= sum; j++) {
      if (j - nums[i - 1] < 0) {
        // 背包容量不足, 不能装入第 i 个物品
        dp[i][j] = dp[i - 1][j]
      } else {
        // 装入或不装入背包
        // 不装入: dp[i - 1][j]
        // 装入: 如果装了第 i 个物品, 就要看背包的剩余重量 j - nums[i-1] 限制下是否能够被恰好装满
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - nums[i - 1]])
      }
    }
  }

  return dp[n][sum]
}
```

### 一维数组解法

`dp[i][j]` 都是通过上一行 `dp[i-1][..]` 转移过来的, 之前的数据都不会再使用了, 因此可以把 i 消去.

```ts
var canPartition = function (nums) {
  let sum = nums.reduce((acc, val) => acc + val)
  if (sum % 2 === 1) return false
  const n = nums.length
  sum /= 2

  const dp = new Array(sum + 1).fill(false)
  dp[0] = true

  for (let i = 1; i <= n; i++) {
    for (let j = sum; j >= 0; j--) {
      if (j - nums[i - 1] >= 0) {
        dp[j] = dp[j] || dp[j - nums[i - 1]]
      }
    }
  }

  return dp[sum]
}
```