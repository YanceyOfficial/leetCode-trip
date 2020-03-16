import { IArrayStack } from './types'

export class Stack<T> implements IArrayStack<T> {
  private readonly items: T[]

  constructor() {
    this.items = []
  }

  public push(...elements: T[]) {
    for (let i = 0; i < elements.length; i += 1) {
      this.items.push(elements[i])
    }
  }

  public pop() {
    return this.items.pop()
  }

  public peek() {
    return this.items[this.items.length - 1]
  }

  public isEmpty() {
    return this.items.length === 0
  }

  public clear() {
    this.items.length = 0
  }

  public size() {
    return this.items.length
  }
}
