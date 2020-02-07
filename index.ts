import Server from './classes/server';
import userRourtes from './routes/usuarios';
import mongoose, { Mongoose } from 'mongoose';


const server = new Server();

//Rutas de mi aplicacion
server.app.use( '/user', userRourtes );


//Conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgrams',
               { useUnifiedTopology: true, useNewUrlParser: true , useCreateIndex: true}, 
                            (err) => {
                              if ( err ) throw err;
                              console.log('Base de datos ONLINE!');
                            })
         

//Levantar Express
server.start(  () => {
  console.log(`Servidor Corriendo en Puerto ${ server.port } ` );
})