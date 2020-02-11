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


### Esta seria la Version 1.0.0 de nuestro BackEnd
   contiene los siguentes servicios.
        - Creacion de Usuarios 
        - Actualizaciones de Usuarios
        - Login de Usuarios.
        
   Ademas tenemos la encriptacion de las claves de acceso 
        - encriptacion de Claves 
        - Creacion de Token de seguridad.
        - validacion de Token en los servicios de /Login/update
        

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


Creacion de Post.model , 
esto es una clase muy importante en nuestra aplicacion
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

### El servicio debe retornar un json como el que se describe a continuacion.



~~~json
{
    "ok": true,
    "body": {
        "img": [],
        "_id": "5e3db9c043f2b7336c6a43e5",
        "mensaje": "Hola Mundo",
        "coords": "14,14",
        "usuario": {
            "avatar": "avg6.png",
            "_id": "5e3daaec8650e477d4d2c9ec",
            "nombre": "Hector Ortiz",
            "email": "Hector.ortiz@gmail.com",
            "password": "$2b$10$ieTqusqLYTxORek5atufFopAKd0vMnidzysDj6Pqu6Q2nXsHm",
            "__v": 0
        },
        "created": "2020-02-07T19:25:52.851Z",
        "__v": 0
    }
}
~~~


# Servicio para obtener los POST
  ### En mongo al colocar el .sort({ _id: -1}) le Estoy indicando que 
  ###    ordene el resultado de forma descendente...

  
~~~javascript
  let pagina = Number( req.query.pagina) || 1 ;
  let skip = pagina-1;
        skip = skip * 10;

   const posts = await  Post.find()
                  .sort({ _id: -1})
                  .skip( skip )
                  .limit(10)
                  .populate('usuario', '-password')
                  .exec();
~~~                  

# Servicio para subir Archivos
En esta seccion trabajaremos los procesos de carga de archivos.
para esto importaremos en nuestro index.ts lo siguiente.

~~~javascript
import fileUpload from 'express-fileupload';
~~~

a su vez tambien ejecutarmos el siguiente comando en nuestra consola.

~~~javascript
npm install @types/express-fileupload --save-dev
~~~


en este caso utilizaremos el fileUpload, esto toma los archivos los carga y los coloca en una seccion especial
la misma es conocida como FILES.

colocaremos el siguiente codigo justo debajo de la seccion Body parser en el archivo index.ts

Codigo type script para instanciar el fileUpload.
~~~javascript
//FileUpload
server.app.use(fileUpload()) ;
~~~



# Explicacion del proceso que aplicaremos

# Clase para el Manejo del FileSystem

En este punto tocamos varias cosas,

importamos el path que nos permite tener acceso a todo el directorio del equipo,
si ustedes lo desean pueden hacer una prueba con el ***console.log** para determinar 
la valides de la ejecucion del comanto.

Ademos tenemos que importar Fs que nos permite tener acceso al filesystem.

#### La clase que crearemos a continuacion se describe debajo con la misma podremos crear 
#### archivos desde nuestro servicio de Nodejs.  

#### Debemos senalar que todas las carpetan tienen como nombre el id de los usuarios.
#### esto nos garantizara que se repitan las carptas en nuestro servido REST.


~~~javascript
import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';

export default class FileSystem {


  constructor() {

  }


  guardarImagenTemporal(file: FileUpload , userId: string) {
    const path = this.crearCarpetausuario(userId);
  }

  private crearCarpetausuario(userid: string) {
    const pathUser = path.resolve( __dirname , '../uploads/', userid);
    const pathuserTemp = pathUser + '/temp';
    console.log(pathUser);

    const existe = fs.existsSync(pathUser);

    if (!existe){
      fs.mkdirSync(pathUser);
      fs.mkdirSync(pathuserTemp);
    }

    return pathuserTemp;




  }

}

~~~

# Generar un nombre unico a la imagen

Existe un paquete en javaScript que me permite generar id's uniccos 
~~~javascript
npm install uniqid
~~~
## instalamos los types de la siguiente manera

UUID ***(Universally Unique ID)*** es un estándar ***(parte de ISO/IEC 11578:1996)*** para crear identificadores únicos universales para identificar objetos en un sistema.

El __UUID__ tiene un longitud de 128 bit (16 bytes) y aunque no garantiza la unicidad, la probabilidad de colisiones es reducida debido al número de bits y a la forma en que éstos son generados.

Los algoritmos de creación de UUID están especificados en RFC4122. Un ejemplo de UUID sería el siguiente:
~~~javascript
npm install @types/uniqid
~~~
#### Creamos un proceso que nos genere un id unico.
#### en mi caso lo hicimos de la siguiente manera.

~~~javascript
  private generarNombreUnico(nombreOriginal: string){ //
        // images.jpg
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];

      const idUnico = uniqid();

      return `${idUnico}.${extension}`;

  }
~~~

#### Ya solo nos queda llamar este proceso para que nos genere el nombre unico del archivo.
#### 
~~~javascript
 const nombreArchivo = this.generarNombreUnico( file.name);
~~~

# Mover el archivo Fisico a la carpeta que hemos creado

# Mover Imagenes del Temp personalizado a la carpeta post

# Servicio para mostrar una imagen por URL

# Retornar Informacion del usuario por Token.

