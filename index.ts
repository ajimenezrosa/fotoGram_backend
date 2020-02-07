import Server from './classes/server';
import userRourtes from './routes/usuarios';



const server = new Server();

//Rutas de mi aplicacion
server.app.use( '/user', userRourtes );

//Levantar Express
server.start(  () => {
  console.log(`Servidor Corriendo en Puerto ${ server.port } ` );
})