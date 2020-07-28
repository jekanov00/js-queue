'use strict';

class Queue {
  constructor (...args) {
    this._size = 0;
    this.enqueue(...args);
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
    for (let elem of args) {
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
          done: count++ === that.size,
        };
      },
    };
  }
}

class PriorityQueue extends Queue {
  /**
   * @param args[any - value, number - priority]
   */
  constructor (...args) {
    super();
    this.enqueue(...args);
  }

  /**
   * @param args[any - value, number - priority]
   */
  enqueue (...args) {
    for (let elem of args) {
      if (!Array.isArray(elem)) {
        throw new TypeError('Wrong argument format!');
      }
    }

    super.enqueue(...args);

    const result = [...this].sort((a, b) => a[1] - b[1]);
    for (let i = 0; i < this.size; i++) {
      delete this[i];
    }
    this.size = 0;

    super.enqueue(...result);

    return this.size;
  }
}

