import Server from './classes/server';
import userRourtes from './routes/usuarios';
import mongoose, { Mongoose } from 'mongoose';
import bodyParser from 'body-parser';

import fileUpload from 'express-fileupload';

import postRouts from './routes/post.route';


const server = new Server();

//Body parser
server.app.use(bodyParser.urlencoded( {  extended: true  }));
server.app.use(bodyParser.json());


//FileUpload
server.app.use(fileUpload( {useTempFiles: true})) ;


//Rutas de mi aplicacion
server.app.use( '/user', userRourtes );
server.app.use( '/post', postRouts );


//Conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram',
               { useUnifiedTopology: true, useNewUrlParser: true , useCreateIndex: true}, 
                            (err) => {
                              if ( err ) throw err;
                              console.log('Base de datos ONLINE!');
                            })
         

//Levantar Express
server.start(  () => {
  console.log(`Servidor Corriendo en Puerto ${ server.port } ` );
})