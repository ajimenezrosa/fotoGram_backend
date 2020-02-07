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


cololar mode de escucha para que transforme los archivos de TypeScript en Js de forma automatica
~~~javascript
  tsc -w
~~~

para que actualice los cambios estaria pendiente de la carpeta dist/

~~~javascript
  nodemon dist/
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

# Código fuente de la sección

### Código fuente hasta el momento
Hemos llegado a un punto importante en nuestro backend server en el cual ya se conecta a la base de datos y creamos usuarios con sus respectivos tokens y claves encriptadas

# 
Recuerden que los módulos de node no van en el archivo comprimido, deben de ejecutar un npm install para reconstruirlos.
~~~javascript
npm install
~~~



En la siguiente sección trabajaremos con la generación de POSTs y subida de imágenes.



# Temas puntuales

Asignaremos fotografías a documentos de Node, crearemos carpetas por usuarios, ID únicos a las imágenes para evitar duplicados y sobre escribir cualquier información y otras cosas.

También crearemos un servicio que nos hacía falta para validar el token del usuario

# Backend FotoGram POST y Subida de archivos.

# introduccion

# Modelo de base de datos Post.
  Tendremos toda la informacion que postean los usuarios.

~~~javaScript
    import { Schema, Document ,model  } from 'mongoose';
~~~

~~~javascript

import { Schema, Document ,model  } from 'mongoose';
import { Usuario } from './usuario.model';


const postSchema = new Schema({

  created: {
    type: Date
  },
  mensaje: {
    type: String
  },
  img: [{
    type: String
  }],
  coords: {
    type: String
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true , 'Debe de existir una referencia a un usuario']
  }

});

postSchema.pre<Ipost>('save', function( next ) {
    this.created = new Date();
    next();
});

interface Ipost extends Document {
  created: Date;
  mensaje: string;
  img: string[];
  coords: string;
  Usuario: string;

}


export const Post = model<Ipost>('Post' , postSchema);

~~~



# Servicio para crear un POST

# Servicio para obtener los POST

# Servicio para subir Archivos

# Explicacion del proceso que aplicaremos

# Clase para el Manejo del FileSystem

# Generar un nombre unico a la imagen

# Mover el archivo Fisico a la carpeta que hemos creado

# Mover Imagenes del Temp personalizado a la carpeta post

# Servicio para mostrar una imagen por URL

# Retornar Informacion del usuario por Token.

