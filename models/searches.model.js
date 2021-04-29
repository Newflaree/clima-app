const axios = require( 'axios' );

class Searches {
  history = [ 'Valdivia', 'Orlando', 'Barcelona' ];

  constructor() {
    // TODO: leer DB si existe
  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    }
  }

  get paramsWeather() {
    return {
      appid: process.env.OPEN_WEATHER_KEY,
      units: 'metric',
      lang: 'es'
    }
  }

  async city( place = '' ) {
    try {
      // Http request
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
        params: this.paramsMapbox 
      }); 

      const resp = await instance.get();
      return resp.data.features.map( place => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1]
      }));

    } catch ( err ) {
      return [];
    }
  }

  async weatherPlace( lat, lon ) {
    try {
      // Http request
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon }
      }); 
      
      // resp 
      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp 
      }

    } catch ( err ) {
      return [];
    }
  }

}

module.exports = Searches;
