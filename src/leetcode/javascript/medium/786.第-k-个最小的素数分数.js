/*
 * @lc app=leetcode.cn id=786 lang=javascript
 *
 * [786] 第 K 个最小的素数分数
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var kthSmallestPrimeFraction = function (arr, k) {
  const n = arr.length
  const pq = new MinHeap()
  for (let i = 1; i < n; i++) {
    pq.offer([arr[0] / arr[i], 0, i])
  }

  let curr = null
  while (pq.size > 0 && k-- > 0) {
    curr = pq.poll()

    if (curr[1] < curr[2] - 1) {
      pq.offer([arr[curr[1] + 1] / arr[curr[2]], curr[1] + 1, curr[2]])
    }
  }

  return [arr[curr[1]], arr[curr[2]]]
}

class MinHeap {
  constructor(compare = (a, b) => a[0] - b[0] < 0) {
    this.data = []
    this.size = 0
    this.compare = compare
  }

  peek() {
    return this.size === 0 ? null : this.data[0]
  }

  offer(val) {
    this.data.push(val)
    this._shifUp(this.size++)
  }

  poll() {
    if (this.size === 0) {
      return null
    }
    this._swap(0, --this.size)
    this._shifDown(0)
    return this.data.pop()
  }

  _parent(index) {
    return (index - 1) >> 1
  }

  _child(index) {
    return (index << 1) + 1
  }

  _shifDown(index) {
    while (this._child(index) < this.size) {
      let child = this._child(index)
      if (
        child + 1 < this.size &&
        this.compare(this.data[child + 1], this.data[child])
      ) {
        child = child + 1
      }
      if (this.compare(this.data[index], this.data[child])) {
        break
      }
      this._swap(index, child)
      index = child
    }
  }

  _shifUp(index) {
    while (
      this._parent(index) >= 0 &&
      this.compare(this.data[index], this.data[this._parent(index)])
    ) {
      this._swap(index, this._parent(index))
      index = this._parent(index)
    }
  }

  _swap(a, b) {
    ;[this.data[a], this.data[b]] = [this.data[b], this.data[a]]
  }
}
// @lc code=end

console.log(kthSmallestPrimeFraction([1, 2, 3, 5], 3))
