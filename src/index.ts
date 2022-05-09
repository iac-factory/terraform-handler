import { Flag } from "./cli";

const Main = async (duration = 2500) => {
    const debug = Flag( "--debug" ) && !( process.env[ "CI" ] );

    const handler = async () => new Promise( async (resolve) => {
        ( debug ) && process.stdout.write( "Initializing ..." + "\n" );

        const input = Array.from( process.argv );

        const serialization = JSON.stringify( {
            input: JSON.stringify( input.slice( 2 ) ),
            output: JSON.stringify( [
                "Test"
            ] )
        }, null, 4 );

        process.stdout.write( serialization );

        setTimeout( () => resolve( true ), duration );
    } );

    return handler();
};

void ( async () => Main() )();

export default Main;

export { Main };
