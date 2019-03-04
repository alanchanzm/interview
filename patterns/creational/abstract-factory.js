// 多种产品
class Mouse {
  constructor(brand) {
    this.brand = brand;
  }

  /**
   * click
   */
  click() {
    console.log(`${this.brand} clicked.`);
  }

  /**
   * double click
   */
  doubleClick() {
    console.log(`${this.brand} double clicked.`);
  }
}

class LogiMouse extends Mouse {
  constructor() {
    super('Logi');
  }
}

class Keyboard {
  constructor(brand) {
    this.brand = brand;
  }

  /**
   * entry
   */
  entry() {
    console.log(`${this.brand} entry.`);
  }
}

class LogiKeyboard extends Keyboard {
  constructor() {
    super('Logi');
  }
}

class CherryKeyboard extends Keyboard {
  constructor() {
    super('Cherry');
  }
}

// TODO: it seems useless for js
function abstractFactory() {}
