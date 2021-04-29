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

  async city( place = '' ) {
    try {
      // Http request
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
        params: this.paramsMapbox 
      }); 

      const resp = await intance.get();
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

}

module.exports = Searches;
