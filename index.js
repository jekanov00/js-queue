'use strict';

class Queue {
  constructor (...args) {
    this._size = 0;
    for (let elem of args){
      this[this.size++] = elem;
    }
  }

  set size (value) {
    this._size = value;
  }

  get size () {
    return this._size;
  }

  get isEmpty () {
    return this.size === 0;
  }

  enqueue (...args) {
    for (let elem of args){
      this[this.size++] = elem;
    }
    return this.size;
  }

  dequeue () {
    if (this.isEmpty) {
      return;
    }
    let value = this[0];
    delete this[0];
    --this.size;

    for (let i = 1; i <= this.size; i++) {
      this[i - 1] = this[i];
    }
    delete this[this.size];

    return value;
  }

  front () {
    return this[0];
  }

  [Symbol.iterator] () {
    const that = this;
    let count = 0;
    return {
      next () {
        return {
          value: that[count],
          done: count++ === that.size
        };
      },
    };
  }

}



