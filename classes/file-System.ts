import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {


  constructor() {

  }


  guardarImagenTemporal(file: FileUpload , userId: string) {

    //Creacion carpetas
    const path = this.crearCarpetausuario(userId);

    //nombre archivo
    const nombreArchivo = this.generarNombreUnico( file.name);
    console.log(file.name);
    console.log(nombreArchivo);

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

}


