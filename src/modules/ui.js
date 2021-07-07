import { getGif } from './requests';

function createWeatherCard(data) {
  return `<p id="location"><strong>Location:</strong> ${data.sys.country}, ${data.name}</p>
  <p ><strong>Temperature:</strong>${data.main.temp} </p>
  <p ><strong>Feeling like:</strong>${data.main.feels_like} </p>
  <p><strong>Weather type:</strong> ${data.weather[0].main}</p>
  <p><strong>Weather description:</strong>${data.weather[0].description}</p>
  <img class="" id="weatherGif" src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt="${data.weather[0].description}">
  <img class="" id="gif" src="#" alt="#">
</div>`;
}

function insertWeatherCard(data) {
  const card = document.querySelector('#result');
  card.innerHTML = createWeatherCard(data);
}

function displayError(data) {
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