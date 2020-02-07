import { Router ,Request ,Response} from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt, { hashSync } from 'bcrypt';


const userRourtes = Router();

//Login

userRourtes.post('/login' , (req:Request , res:Response) => {

    const body = req.body;

    Usuario.findOne({ email: body.email}, (err , userDB) => {

        if (err ) throw err;

        if ( !userDB ) {
          return res.json({
            ok: false,
            mensaje:  'usuario / contrasena no son conrrectos'
          });
        }

        if (userDB.comprarPassword (body.password)) {
          res.json({
            ok: true,
            token: '#LJA;FLKJASDFLKJASDFFLJKA'
          });
        } else {
          return res.json({
            ok: false,
            mensaje:  'usuario / contrasena no son conrrectos ***'
          });
        }

    })
    
    ////
 


});



//Crear un usuario
userRourtes.post('/create' , (req: Request , res: Response) => {

  const  user = {
    nombre: req.body.nombre,
    email: req.body.email,
    password: bcrypt.hashSync( req.body.password , 10),
    avatar: req.body.avatar
  }

  Usuario.create( user ).then( userDB => {

    
  res.json({
    ok: true,
    user: userDB
  });

  }).catch( err =>{
    res.json({
      ok: false,
      err
    })
  });


});

export default userRourtes;
