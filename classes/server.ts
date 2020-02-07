
import express from 'express';



export default class Server {

    public app : express.Application ;
    public port: number = 3000; 


    constructor() {
      this.app = express();
    }

    //Sustituimos Funtion por any, y se elimino un error. alejandro Jimenez.
    start( callback: any) {
      this.app.listen( this.port ,callback);
    }


}