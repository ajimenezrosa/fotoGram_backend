import { Router, Request, Response, NextFunction } from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt, { hashSync } from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';


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

          const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
          });

          res.json({
            ok: true,
            token: tokenUser
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

    const tokenUser = Token.getJwtToken({
      _id: userDB._id,
      nombre: userDB.nombre,
      email: userDB.email,
      avatar: userDB.avatar
    });

    res.json({
      ok: true,
      token: tokenUser
    });


  }).catch( err =>{
    res.json({
      ok: false,
      err
    })
  });


});


//Actualizar Usuario
userRourtes.post('/update' ,verificaToken, (req: any , res: Response  ) => {

  const user = {
    nombre: req.body.nombre || req.usuario.nombre,
    email:  req.body.email  || req.usuario.email, 
    avatar: req.body.avatar || req.Usuario.avatar
  }

  Usuario.findByIdAndUpdate(req.usuario._id ,user, { new: true }, (err , userDB) => {

      if(err) throw err;
      if (!userDB) {
        return res.json({
          ok: false,
          mensaje: 'No exite un usuario con ese ID'
        })
      }

      //Generar nuevo tokken
      const tokenUser = Token.getJwtToken({
        _id: userDB._id,
        nombre: userDB.nombre,
        email: userDB.email,
        avatar: userDB.avatar
      });

      res.json({
        ok: true,
        token: tokenUser
      });

  });


    // res.json({
    //   ok: true,
    //   usuario: req.usuario
    // });


});




export default userRourtes;
