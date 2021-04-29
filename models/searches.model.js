const axios = require( 'axios' );

class Searches {
  history = [ 'Valdivia', 'Orlando', 'Barcelona' ];

  constructor() {
    // TODO: leer DB si existe
  }

  async city( place = '' ) {
    try {
      // Http request
      const resp = await axios.get( 'https://api.mapbox.com/geocoding/v5/mapbox.places/Valdivia.json?access_token=pk.eyJ1IjoibmV3ZmxhcmUiLCJhIjoiY2tvMGRtdWRiMDdvdDJvbXk1azV4cmQ2ZiJ9.6wjFGqhQ_P67SZmK2etEwg&limit=5&language=es' );
      console.log( resp.data );

      return [];
    } catch ( err ) {
      return [];
    }
  }

}

module.exports = Searches;
