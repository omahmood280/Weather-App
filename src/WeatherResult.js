import React from 'react';

const WeatherResult = ({ result, fadeClass }) => {
  return (
    <div id = "result" className={`result-text ${fadeClass}`}>
      {result}
    </div>
  )
}

export default WeatherResult;