import { getGif } from './requests';

const createWeatherCard = (data) => {
  return `
  <form id="unit-form">
  <div class="d-flex flex-row justify-content-center mb-3">
  
  <div>
    <input type="radio" id="cel" name="unit" value="metric" checked>
      <label for="cel">Celsius</label><br>
  </div>
  <div>
    <input type="radio" id="fah" name="unit" value="imperial">
          <label for="fah">Fahrenheit</label><br>
  </div>
  
</div>
</form>
  <p id="location"><strong>Location:</strong> ${data.sys.country}, ${data.name}</p>

  <p class="celsius-value showDisplay"><strong>Temperature:</strong>${data.main.temp} °C</p>
  <p class="celsius-value" showDisplay"><strong>Feeling like:</strong>${data.main.feels_like} °C </p>

  <p class="fah-value hideDisplay"><strong>Temperature:</strong>${convertToFah(data.main.temp)}°F</p>
  <p class="fah-value hideDisplay"><strong>Feeling like:</strong>${convertToFah(data.main.feels_like)}°F</p>


  <p><strong>Weather type:</strong> ${data.weather[0].main}</p>
  <p><strong>Weather description:</strong>${data.weather[0].description}</p>
  <img class="" id="weatherGif" src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt="${data.weather[0].description}">
  <img class="" id="gif" src="#" alt="#">
</div>`;
}

const convertToFah = (data) => {
  return (data * 1.8) + 32;
}
const insertWeatherCard = (data) => {
  const card = document.querySelector('#result');
  card.innerHTML = createWeatherCard(data);
  setToggle()
}

const superToggle = (element, class0, class1) => {
  element.classList.toggle(class0);
  element.classList.toggle(class1);
}

const setToggle = () => {
  const celsiusData = document.getElementsByClassName('celsius-value')
  const fahData = document.getElementsByClassName('fah-value')

  document.querySelector('#cel').addEventListener('change', () => {

    for (var i = 0; i < fahData.length; i++) {
      superToggle(fahData[i], 'hideDisplay', 'showDisplay')
    }
  
    for (var i = 0; i < celsiusData.length; i++) {
      superToggle(celsiusData[i], 'hideDisplay', 'showDisplay')
    }

  })

  document.querySelector('#fah').addEventListener('change', () => {
    for (var i = 0; i < celsiusData.length; i++) {
      superToggle(celsiusData[i], 'hideDisplay', 'showDisplay')
    }
  
    for (var i = 0; i < fahData.length; i++) {
      superToggle(fahData[i], 'hideDisplay', 'showDisplay')
    }

  })
}

const displayError = (data) => {
  const errorSpan = document.querySelector('#requestError');
  errorSpan.innerText = data.message;
  errorSpan.style.color = 'red';
}

const displayImage = async (weather) => {
  const imgAdd = document.querySelector('#gif');
  const imageUrl = getGif(weather);

  imageUrl.then((url) => {
    imgAdd.src = url;
  });
};

export {
  insertWeatherCard,
  displayError,
  displayImage,
};