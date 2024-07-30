import { LightningElement, track } from 'lwc';
import retriveWeather from '@salesforce/apex/WeatherController.retriveWeather'

export default class WeatherApp extends LightningElement {
    @track cityName="";
    @track weatherData;
    @track temperature;
    @track windspeed;
    @track weatherDesc;
    @track error;

    handleCityChange(event){
        this.cityName = event.target.value;
        console.log(this.cityName);
    }

    async getWeatherData() {
        if (this.cityName === "") {
            this.weatherData = false;
            this.error = "Please enter city name";
        }
        else{
            retriveWeather({cityName: this.cityName})
                .then(result => {
                    this.weatherData = true;
                    this.formatWeatherData(result);
                })
                .catch(error => {
                    this.weatherData = false;
                    this.error = "Please enter VALID city name";
                    console.log(error);
                });
        }
    }
    formatWeatherData(res) {
        this.temperature = res.weather[0].avgtempC.toString();
        this.windspeed = res.current_condition[0].windspeedKmph.toString();
        this.weatherDesc = res.current_condition[0].weatherDesc[0].value.toString();
    }


}