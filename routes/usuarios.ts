import { Router ,Request ,Response} from "express";

const userRourtes = Router();

userRourtes.get('/prueba' , (req: Request , res: Response) => {

  res.json({
    ok: true,
    mensaje: 'Todo esto Funciona bien!'
  })

});

export default userRourtes;
