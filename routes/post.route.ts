import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';



const postRouts = Router();

  postRouts.post('/', [ verificaToken ], (req: any, res: Response) => {

      const body = req.body;
      body.usuario = req.usuario._id;

        Post.create( body ).then( async postDB =>{

        await  postDB.populate('usuario','-password').execPopulate();

          res.json({
            ok: true,
            body: postDB
          });



        }).catch( err => {
          res.json(err);
        });
      


  });





export default postRouts