import Server from './classes/server';



const server = new Server();


//Levantar Express
server.start(  () => {
  console.log(`Servidor Corriendo en Puerto ${ server.port } ` );
})