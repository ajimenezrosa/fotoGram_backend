import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';



const postRouts = Router();


//Obtener Post paginados
postRouts.get('/', async (req: any, res: Response) => {


  /*En mongo al colocar el .sort({ _id: -1}) le Estoy indicando que 
      ordene el resultado de forma descendente...bundleRenderer.renderToStream

  */

  let pagina = Number( req.query.pagina) || 1 ;
  let skip = pagina-1;
        skip = skip * 10;

   const posts = await  Post.find()
                  .sort({ _id: -1})
                  .skip( skip )
                  .limit(10)
                  .populate('usuario', '-password')
                  .exec();



  res.json({
    ok: true,
    pagina ,
    posts
  })

});




//Crear POST
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