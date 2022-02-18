interface QuackBehavior {
  quack(): void;
}

interface FlyBehavior {
  fly(): void;
}

class Quack implements QuackBehavior {
  quack(): void {
    console.log("Quack");
  }
}

class FlyWithWings implements FlyBehavior {
  fly(): void {
    console.log("Fly");
  }
}

class FlyNoWay implements FlyBehavior {
  fly(): void {
    console.log("I can't fly");
  }
}

abstract class Duck {
  protected _quackBehavior!: QuackBehavior;
  protected _flyBehavior!: FlyBehavior;

  public performQuack(): void {
    this._quackBehavior.quack();
  }

  public swim(): void {
    console.log("Swim");
  }

  public abstract display(): void;

  public performFly(): void {
    this._flyBehavior.fly();
  }

  public get flyBehavior(): FlyBehavior {
    return this._flyBehavior;
  }

  public set flyBehavior(flyBehavior: FlyBehavior) {
    this._flyBehavior = flyBehavior;
  }
}

class MallardDuck extends Duck {
  constructor() {
    super();
    this._quackBehavior = new Quack();
    this._flyBehavior = new FlyNoWay();
  }

  public display(): void {
    console.log("I'm a real Mallard duck");
  }
}

const mallardDuck: Duck = new MallardDuck();
mallardDuck.performQuack();
mallardDuck.performFly();
mallardDuck.flyBehavior = new FlyWithWings();
mallardDuck.performFly();
