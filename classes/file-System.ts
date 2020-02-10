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


