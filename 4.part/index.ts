/* class SimplePizzaFactory {
  createPizza(type: string): Pizza | null {
    switch (type) {
      case "cheese":
        return new CheesePizza();
      case "pepperoni":
        return new PepperoniPizza();
      case "clam":
        return new ClamPizza();
      case "veggie":
        return new VeggiePizza();
      default:
        return null;
    }
  }
} */

abstract class PizzaStore {
  public orderPizza(type: string) {
    const pizza = this.createPizza(type);
    if (pizza === null) return pizza;
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }

  public abstract createPizza(type: string): Pizza | null;
}

class NYStylePizzaStore extends PizzaStore {
  public createPizza(type: string): Pizza | null {
    switch (type) {
      case "cheese":
        return new NYStyleCheesePizza();
      case "pepperoni":
        return new NYStylePepperoniPizza();
      case "clam":
        return new NYStyleClamPizza();
      case "veggie":
        return new NYStyleVeggiePizza();
      default:
        return null;
    }
  }
}

abstract class Pizza {
  protected _name!: string;
  protected _dough!: string;
  protected _sauce!: string;
  protected _toppings: string[] = [];

  public prepare() {
    console.log("Preparing " + this._name);
    console.log("Tossing dough... ");
    console.log("Adding sauce...");
    console.log("Adding toppings: ");
    this._toppings.forEach((topping) => {
      console.log("\t" + topping);
    });
  }
  public bake() {
    console.log("Bake for 25 minutes at 350");
  }
  public cut() {
    console.log("Cutting the pizza into diagonal slices");
  }
  public box() {
    console.log("Place pizza in official PizzaStore box");
  }
  public get name() {
    return this._name;
  }
}

class NYStyleCheesePizza extends Pizza {
  constructor() {
    super();
    this._name = "NY Style Sauce and Cheese Pizza";
    this._dough = "Thin Crust Dough";
    this._sauce = "Marinara Sauce";

    this._toppings.push("Grated Reggiano Cheese");
  }
}
