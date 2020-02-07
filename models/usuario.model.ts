


import { Schema , model , Document} from 'mongoose';



const usuarioSchema = new Schema({
      nombre: {
        type: String,
        required: [ true , 'El nombre es necesario']
      },
      avatar: {
        type: String,
        default: 'av-1.png'
      },
      email: {
        type: String,
        unique: true,
        required: [true , 'El correo es necesario']
      },
      password: {
        type: String,
        required: [true , 'La contrasena es necesaria']
      }
});

interface IUsuario extends Document {
    nombre: String;
    email: String;
    password: String;
}


export const Usuario = model<IUsuario>('Usuario', usuarioSchema);


