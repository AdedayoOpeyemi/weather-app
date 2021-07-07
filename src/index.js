import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';
import { fetchWeatherData } from './modules/requests';
import { insertWeatherCard, displayError, displayImage } from './modules/ui.js';

document.querySelector('#weather-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const city = document.querySelector('#city-name').value;
  const unit = document.querySelector('input[name="unit"]:checked').value;

  const request = fetchWeatherData(city, unit);
  request.then((data) => {
    if (data.cod === 200) {
      insertWeatherCard(data);
      displayImage(data.weather[0].main);
    } else {
      displayError(data);
    }
  });
});

document.querySelector('#city-name').addEventListener('keyup', () => {
  const error = document.getElementById('requestError');
  error.textContent = '';
});
