import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {


  constructor() {

  }


  guardarImagenTemporal(file: FileUpload , userId: string) {

    return new Promise( (resolve, reject) =>{


    //Creacion carpetas
        const path = this.crearCarpetausuario(userId);

        //nombre archivo
        const nombreArchivo = this.generarNombreUnico( file.name);

        //Mover el archivo del Temp a nuestra carpeta temp
        file.mv( `${path}/${nombreArchivo}`, (err: any) => {
            if ( err ){
              reject(err);
            } else {
              resolve();
            }
        });

    });


  }


  private generarNombreUnico(nombreOriginal: string){ //
        // images.jpg
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];

      const idUnico = uniqid();

      return `${idUnico}.${extension}`;

  }

  private crearCarpetausuario(userid: string) {
    const pathUser = path.resolve( __dirname , '../uploads/', userid);
    const pathuserTemp = pathUser + '/temp';
    // console.log(pathUser);

    const existe = fs.existsSync(pathUser);

    if (!existe){
      fs.mkdirSync(pathUser);
      fs.mkdirSync(pathuserTemp);
    }

    return pathuserTemp;




  }

  imagenesDeTempHaciaPost(userId: string ) {
    const pathTemp = path.resolve( __dirname , '../uploads/', userId, 'temp');
    const pathPost = path.resolve( __dirname , '../uploads/', userId, 'posts');

    if (!fs.existsSync( pathTemp )) {
      return [];
    }

    if (!fs.existsSync( pathPost )) {
      fs.mkdirSync(pathPost);
    }


    const imagenesTemp = this.obtenerImagnesEnTemp( userId);

    imagenesTemp.forEach(imagen => {
      fs.renameSync(`${pathTemp}/${imagen}` ,`${pathPost}/${imagen}`);
    });

    return imagenesTemp;

  }

  private obtenerImagnesEnTemp(userId: string ){ 
    const pathTemp = path.resolve( __dirname , '../uploads/', userId, 'Temp');

    return fs.readdirSync(pathTemp) || [];

  }


  getFotoUrl(userId: string, img: string ){

      //path POSTS
      const pathFoto = path.resolve( __dirname , '../uploads/', userId, 'posts' , img);
      //Si la imagen existe
      const existe = fs.existsSync(pathFoto); 

      if (!existe) {
        return path.resolve( __dirname, '../assets/400x250.jpg');
      }

      return pathFoto;

  }

  

}


