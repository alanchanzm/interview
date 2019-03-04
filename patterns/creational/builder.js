function createPartA() {
  return 'foo';
}

function createPartB() {
  return 'bar';
}

function createPartC(answer) {
  return { answer };
}

/**
 * 用于生成复杂的对象
 * 把构建和表示分离开
 */
class Builder {
  constructor(answer) {
    this.a = createPartA();
    this.b = createPartB();
    this.c = createPartC(answer);
  }
}

/**
 * js does not need a CLASS to create object
 * however you may need CLASS for reference variables
 * @param {} answer
 */
function builder(answer) {
  return {
    a: createPartA(),
    b: createPartB(),
    c: createPartC(answer)
  };
}
