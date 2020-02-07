# FotoGram BackEnd
## Paquetes necesarios para nuestro proyecto.
- npm install express
- npm install body-parser
- npm install cors
- npm install mongoose
- npm install express-fileupload
- npm install jsonwebtoken
- npm install bcrypt

#### Ejecucion npm
Podemos Ejecutar todas las instalaciones juntas utilizando la linea descrita mas abajo.
~~~npm
npm install express body-parser cors mongoose express-fileupload jsonwebtoken bcrypt
~~~


# instalacion de MongoDB y Mongoose

## La base de datos líder para aplicaciones modernas
MongoDB es una base de datos distribuida, basada en documentos y de uso general que ha sido diseñada para desarrolladores de aplicaciones modernas y para la era de la nube. Ninguna otra ofrece un nivel de productividad de uso tan alto.


## Clases para Crear las intancias de Express

~~~JavaScript

import  express  from 'express'; 
import mongoose from 'mongoose';
~~~


## Clases Server Creacion de las instancias


Clase de Server ;
creacion de las instancias....
~~~JavaScript
import express from 'express';
export default class Server {

    public app : express.Application ;
    public port: number = 3000; 

    constructor() {
      this.app = express();
    }

  start( callback: any) {
      this.app.listen( this.port ,callback);
    }
}
~~~



