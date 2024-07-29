public with sharing class WeatherController {
    public static Map<String, Object> retriveWeather(String cityName) {
        HttpRequest httpRequest = new HttpRequest();
        String baseUrl = 'https://wttr.in/' + cityName + '?format=j2';
        httpRequest.setEndpoint(baseUrl);
        httpRequest.setMethod('GET');

        Map<String, Object> newsJsonData = new Map<String, Object>();
        String strResponse = null;

        try{
            Http http = new Http();
            HttpResponse httpResponse = http.send(httpRequest);
            if(httpResponse.getStatusCode() == 200){
                strResponse = httpResponse.getBody();
            } else {
                throw new CalloutException(httpResponse.getBody());
            }

        } catch(Exception ex){
            throw ex;
        }

        if(!String.isBlank(strResponse)){
            newsJsonData = (Map<String, Object>)JSON.deserializeUntyped(strResponse);
        }
        if(!newsJsonData.isEmpty()){
            return newsJsonData;
        } else {
            return null;
        }
    }
}