require( 'dotenv' ).config();

// Models
const Searches = require( './models/searches.model' );

// Helpers
const { 
  inquirerMenu, 
  listPlaces,
  pause,
  readInput
} = require( './helpers/inquirer.helper' );


const main = async() => {
  const searches = new Searches();
  let opt;

  do {
    opt = await inquirerMenu();

    switch ( opt ) {
      case 1:
        // Show message
        const place = await readInput( 'Ciudad: ' );
        
        // Search the places
        const places = await searches.city( place );
        
        // Select the place
        const selectedId = await listPlaces( places );
        if ( selectedId === '0' ) continue;

        const selectedPlace = places.find( l => l.id === selectedId );

        // Save to DB
        searches.addHistory( selectedPlace.name );
        
        // Weather
        const { temp, min, max, desc } = await searches.weatherPlace( selectedPlace.lat, selectedPlace.lng );
        
        // Show results
        console.clear();
        console.log( '\nInformación de la ciudad\n'.green );
        console.log( 'Ciudad:', selectedPlace.name.green );
        console.log( 'Lat:', selectedPlace.lat );
        console.log( 'Lng:', selectedPlace.lng );
        console.log( 'Temperatura:', temp );
        console.log( 'Mínima:', min );
        console.log( 'Máxima:', max );
        console.log( 'Cómo está el clima:', desc.green );
        
        break;

      case 2:
        searches.capitalizedHistory.forEach( ( place, i ) => {
          const idx = `${ i + 1 }.`.green;
          console.log( `${ idx } ${ place }` );
        });

        break;

    }

    if ( opt !== 0 ) await pause();
  } while ( opt !== 0 );
}

main();
