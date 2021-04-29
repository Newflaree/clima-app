require( 'dotenv' ).config();

const { readInput, inquirerMenu, pause } = require( './helpers/inquirer.helper' );
const Searches = require( './models/searches.model' );

const main = async() => {
  const searches = new Searches();
  let opt;

  do {
    opt = await inquirerMenu();

    switch ( opt ) {
      case 1:
        // Show message
        const place = await readInput( 'Ciudad: ' );
        await searches.city( place );
        
        // Search the places
        
        // Select the place
        
        // Weather
        
        // Show results
        console.log( '\nInformación de la ciudad\n'.green );
        console.log( 'Ciudad' );
        console.log( 'Lat' );
        console.log( 'Lng' );
        console.log( 'Temperatura' );
        console.log( 'Mínima' );
        console.log( 'Máxima' );
        
        break;

      case 2:
        break;

      case 0:
        break;

    }

    if ( opt !== 0 ) await pause();
  } while ( opt !== 0 );
}

main();
