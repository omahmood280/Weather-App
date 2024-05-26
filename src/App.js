
import React, { useState } from 'react';
import './App.css';
import InputForm from './InputForm';
import WeatherResult from './WeatherResult';

const App = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [result, setResult] = useState('');
  const [fadeClass, setFadeClass] = useState('');
  const apikey = 'd5d0c58cec7185d2e06bf2f5b779e6be';


  const loadWeather = async () => {
    try {

      // Add fade-out class
      setFadeClass('fade-out');
      // Delay the weather fetch to allow fade-out animation
      await new Promise(resolve => setTimeout(resolve, 500));
    
      // User left the city box empty
      if(city==''){
        setResult("Please enter in a city")
        return;
      }

      // We use this call to get the latitude and longitude so we can then fetch the weather as this api requires those parameters to get the weather
      const responseCity = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${apikey}`);
      const responseData = await responseCity.json();

      // Api didn't return anything
      if(responseData.length ==0){
        throw new Error();
      }

      // we also extract the state as for USA we want to display the state name too
      const { lat, lon, state: responseState} = responseData[0];
      const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`);
      const weatherData = await responseWeather.json();

      // For USA data we include the state too as some states have cities with the same name so we should be more specific with what we display
      if (responseData[0].country == "US") {
        setResult(`${weatherData.main.temp}°C: ${responseData[0].name.toUpperCase()}, ${responseState.toUpperCase()}, ${responseData[0].country.toUpperCase()}`);
      } 
      else {
        // If we aren't given a country name then we just display the one automatically returned by the API in the result
        if(country == ''){
        setResult(`${weatherData.main.temp}°C: ${responseData[0].name.toUpperCase()}, ${responseData[0].country.toUpperCase()}`);
      }
      else{
        setResult(`${weatherData.main.temp}°C: ${responseData[0].name.toUpperCase()}, ${country.toUpperCase()}`);
      }
      }
      setFadeClass('fade-in');

    } catch (error) {
      setResult("Ooops. Not Found. Please try again");
      setFadeClass('fade-in');

    }
  };

  const onCityChange = (value) => {
    setCity(value);
  };

  const onCountryChange = (value) => {
    setCountry(value);
  };

  const onStateChange = (value) => {
    setState(value);
  };

  return (
    <div className="App">
      <InputForm
        city={city}
        country={country}
        state={state}
        onCityChange={onCityChange}
        onCountryChange={onCountryChange}
        onStateChange={onStateChange}
        onSubmit={loadWeather}
      />
      <WeatherResult result={result} fadeClass={fadeClass}/>
    </div>
  );
}

export default App;
