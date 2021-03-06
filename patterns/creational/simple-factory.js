/**
 * 抽象产品类
 * 1. 提供接口规范
 * 2. 抽取通用逻辑
 * 改变 Product 类之后，每一个具体类都需要修改 break
 * @class
 */
class Product {
  constructor(name) {
    this.name = name;
  }

  /**
   * 使用产品
   * @abstract
   */
  use() {}
}

/**
 * 具体产品类 —— 食品
 * @class
 * @extends Product
 */
class Food extends Product {
  constructor(name) {
    super(name);
  }

  use() {
    this.eat();
  }

  eat() {
    console.log(`I eat this ${this.name}.`);
  }
}

/**
 * 具体产品类 —— 交通工具
 * @class
 * @extends Product
 */
class Vehicle extends Product {
  constructor(name) {
    super(name);
  }

  use() {
    this.drive();
  }

  drive() {
    console.log(`I drive this ${this.name}.`);
  }
}

/**
 * 创建具体产品实例
 * 新增产品后需要修改工厂
 * @param {string} type
 */
function factory(type) {
  switch (type) {
    case 'food':
      return new Food('sandwish');
    case 'vehicle':
      return new Vehicle('car');
  }
}

// 对于任意产品，使用者都可以调用相同的 API —— use，不要关心具体产品种类
const product1 = factory('food');
product1.use();
const product2 = factory('vehicle');
product2.use();
