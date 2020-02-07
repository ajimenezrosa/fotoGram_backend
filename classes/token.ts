import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Usuario } from '../models/usuario.model';


export default class Token {

  private static seed: string = 'La-única-ventaja-de-jugar-con-fuego-es-que-aprende-uno-a-no-quemarse';
  private static caducidad: string = '30d';


  constructor() {  }

  static getJwtToken(payload: any ): string {
    return jwt.sign({
      usuario: payload
    }, this.seed, { expiresIn: this.caducidad});
  }

  static comprobarToken( userToken: string) {


    return new Promise( (resolve , reject ) =>{


      jwt.verify(userToken , this.seed, ( err , decoded) =>{
        if (err){
          // no confiar
          reject();
        } else {
          //token valido
          resolve( decoded );
        }
      })

    });

  }

}