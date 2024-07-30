import { LightningElement, track } from 'lwc';
import retriveWeather from '@salesforce/apex/WeatherController.retriveWeather'

export default class WeatherApp extends LightningElement {
    @track cityName;
    @track weatherData;
    @track temperature;
    @track windspeed;
    @track weatherDesc;

    handleCityChange(event){
        this.cityName = event.target.value;
        console.log(this.cityName);
    }

    getWeatherData() {
        retriveWeather({cityName: this.cityName})
            .then(result => {
                this.weatherData = true;
                this.formatWeatherData(result);
            })
            .catch(error => {
                console.log(error);
            });
    }
    formatWeatherData(res) {
        this.temperature = res.weather[0].avgtempC.toString();
        this.windspeed = res.current_condition[0].windspeedKmph.toString();
        this.weatherDesc = res.current_condition[0].weatherDesc[0].value.toString();
    }


}