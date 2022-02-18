abstract class Beverage {
  protected _description!: string;

  public get description() {
    return this._description;
  }

  public abstract cost(): number;
}

abstract class CondimentDecorator extends Beverage {
  protected _beverage!: Beverage;
  public abstract get description(): string;
}

class Espresso extends Beverage {
  constructor() {
    super();
    this._description = "Espresso";
  }
  public cost(): number {
    return 1.99;
  }
}

class HouseBlend extends Beverage {
  constructor() {
    super();
    this._description = "House Blend Coffee";
  }
  public cost(): number {
    return 0.89;
  }
}

class DarkRoast extends Beverage {
  constructor() {
    super();
    this._description = "Dark Roast";
  }
  public cost(): number {
    return 0.99;
  }
}

class Decaf extends Beverage {
  constructor() {
    super();
    this._description = "Decaf";
  }
  public cost(): number {
    return 1.05;
  }
}

class Mocha extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this._beverage = beverage;
  }

  public get description(): string {
    return this._beverage.description + ", Mocha";
  }

  public cost(): number {
    return this._beverage.cost() + 0.2;
  }
}

class Soy extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this._beverage = beverage;
  }

  public get description(): string {
    return this._beverage.description + ", Soy";
  }

  public cost(): number {
    return this._beverage.cost() + 0.15;
  }
}

class Whip extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this._beverage = beverage;
  }

  public get description(): string {
    return this._beverage.description + ", Whip";
  }

  public cost(): number {
    return this._beverage.cost() + 0.1;
  }
}

const beverage: Beverage = new Espresso();
console.log(`${beverage.description} $${beverage.cost()}`);

let beverage2: Beverage = new DarkRoast();
beverage2 = new Mocha(beverage2);
beverage2 = new Mocha(beverage2);
beverage2 = new Whip(beverage2);

console.log(`${beverage2.description} $${beverage2.cost()}`);

let beverage3: Beverage = new DarkRoast();
beverage3 = new Soy(beverage3);
beverage3 = new Mocha(beverage3);
beverage3 = new Whip(beverage3);

console.log(`${beverage3.description} $${beverage3.cost()}`);