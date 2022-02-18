interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObserver(): void;
}

interface Observer {
  update(): void;
}

interface DisplayElement {
  display(): void;
}

class WeatherData implements Subject {
  private observers: Observer[];
  private _temperature!: number;
  private _humidity!: number;
  private _pressure!: number;

  constructor() {
    this.observers = [];
  }

  public get temperature(): number {
    return this._temperature;
  }
  public get humidity(): number {
    return this._humidity;
  }
  public get pressure(): number {
    return this._pressure;
  }

  public registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }
  public removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }
  public notifyObserver(): void {
    this.observers.forEach((observer) => {
      observer.update();
    });
  }
  public measurementsChanged(): void {
    this.notifyObserver();
  }

  public setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number
  ): void {
    this._temperature = temperature;
    this._humidity = humidity;
    this._pressure = pressure;
    this.measurementsChanged();
  }
}

class CurrentConditionsDisplay implements Observer, DisplayElement {
  private _temperature!: number;
  private _humidity!: number;
  private _weatherData!: WeatherData;

  constructor(weatherData: WeatherData) {
    this._weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  public update(): void {
    this._humidity = this._weatherData.humidity;
    this._temperature = this._weatherData.temperature;
    this.display();
  }
  display(): void {
    console.log(
      `Current conditions: ${this._temperature}F degrees and ${this._humidity}% humidity`
    );
  }
}

class ForecastDisplay implements Observer, DisplayElement {
  private _lastPressure!: number;
  private _currentPressure = 29.2;
  private _weatherData!: WeatherData;

  constructor(weatherData: WeatherData) {
    this._weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  display(): void {
    console.log(
      `Current pressure: ${this._currentPressure}, last pressure: ${this._lastPressure}`
    );
  }
  update(): void {
    this._lastPressure = this._currentPressure;
    this._currentPressure = this._weatherData.pressure;
    this.display();
  }
}

const weatherData = new WeatherData();

const currentConditionsDisplay = new CurrentConditionsDisplay(weatherData);
const forecastDisplay = new ForecastDisplay(weatherData);

weatherData.setMeasurements(80, 65, 30.4);
weatherData.setMeasurements(83, 70, 29.2);
weatherData.setMeasurements(78, 90, 29.2);

/* float t = weatherData.getTemperature();
			float rh = weatherData.getHumidity();
			heatIndex = (float)
				(
				(16.923 + (0.185212 * t)) + 
				(5.37941 * rh) - 
				(0.100254 * t * rh) + 
				(0.00941695 * (t * t)) + 
				(0.00728898 * (rh * rh)) + 
				(0.000345372 * (t * t * rh)) - 
				(0.000814971 * (t * rh * rh)) +
				(0.0000102102 * (t * t * rh * rh)) - 
				(0.000038646 * (t * t * t)) + 
				(0.0000291583 * (rh * rh * rh)) +
				(0.00000142721 * (t * t * t * rh)) + 
				(0.000000197483 * (t * rh * rh * rh)) - 
				(0.0000000218429 * (t * t * t * rh * rh)) +
				(0.000000000843296 * (t * t * rh * rh * rh)) -
				(0.0000000000481975 * (t * t * t * rh * rh * rh))); */
