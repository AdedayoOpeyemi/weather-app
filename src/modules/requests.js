const fetchWeatherData = async (city, units) => {
  const base = 'https://api.openweathermap.org/data/2.5/weather';
  const key = 'd17eafb04cf171172d18224fbe49f488';
  const response = await fetch(`${base}?q=${city}&APPID=${key}&units=${units}`, { mode: 'cors' });
  const data = await response.json();
  return data;
}

const getGif = async (weather) => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=FVBeJfXOTEMyK9JI6JRXmaUy1iS5jaqn&s=${weather}`, { mode: 'cors' });
  const result = await response.json();
  if (result.meta.status === 200) {
    return result.data.images.original.url;
  }
  return './assets/errorImage.jpg';
};

export {
  fetchWeatherData,
  getGif,
};