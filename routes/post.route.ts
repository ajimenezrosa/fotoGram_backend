import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-System';



const postRouts = Router();
const fileSyetem = new FileSystem();

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

      


      const imagenes = fileSyetem.imagenesDeTempHaciaPost(body.usuario);
      console.log(imagenes);
      body.imgs = imagenes;

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


//Servicios para subir Archivos
postRouts.post('/upload', [ verificaToken ] , async ( req: any, res: Response) =>{

    if( !req.files ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'No se subio ningun archivo'
      });
    }

    const file: FileUpload = req.files.image;

    if ( !file.mimetype.includes('image')) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Lo que se Subio no es una Imagen'
      });
    }


  await  fileSyetem.guardarImagenTemporal(file, req.usuario._id);

    res.json({
      ok: false,
      file: file.mimetype
    });

});




//cuando identificamos en el servicio de esta forma /:userid/:img
//lo toma de forma obligatoria es decir si no recibe esto no funciona el servicio.
postRouts.get('/imagen/:userid/:img', (req: any, res:Response)=> {

    const userId = req.params.userid;
    const img = req.params.img;

    const pathFoto = fileSyetem.getFotoUrl(userId, img);

      res.sendFile(pathFoto);
  // res.json({
  //   userId, img
  // });

});


export default postRouts