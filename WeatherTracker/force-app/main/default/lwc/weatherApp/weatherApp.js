import { LightningElement, track } from 'lwc';
import retriveWeather from '@salesforce/apex/WeatherController.retriveWeather'

export default class WeatherApp extends LightningElement {
    @track cityName;
    @track weatherData;

    handleCityChange(event){
        this.cityName = event.target.value;
        console.log(this.cityName);
    }

    getWeather() {
        retriveWeather({cityName: this.cityName})
            .then(result => {
                let date = result.weather[0].date.toString();
                this.weatherData = date;
                console.log(date);
            })
            .catch(error => {
                console.log(error);
            });
    }
}