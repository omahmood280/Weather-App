// InputForm.js
import React from 'react';

const InputForm = ({
  city,
  country,
  state,
  onCityChange,
  onCountryChange,
  onStateChange,
  onSubmit
}) => {
  return (
    <div className="input-container">
      <div>
        Enter a city (E.g. Tokyo)
      </div>
      <input id="city" placeholder="city name..." value={city} onChange={(e) => onCityChange(e.target.value)} />

      <div>
        Optional: Enter a country (E.g. "United Kingdom")
      </div>
      <input id="country" placeholder="country name..." value={country} onChange={(e) => onCountryChange(e.target.value)} />

      <div>
        Optional: Enter a state (E.g. California)
      </div>
      <input id="state" placeholder="state name..." value={state} onChange={(e) => onStateChange(e.target.value)} />

      <button onClick={onSubmit}>Load Data</button>
    </div>
  );
}

export default InputForm;
