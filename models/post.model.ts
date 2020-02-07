
import { Schema, Document ,model  } from 'mongoose';
import { Usuario } from './usuario.model';


const postSchema = new Schema({

  created: {
    type: Date
  },
  mensaje: {
    type: String
  },
  img: [{
    type: String
  }],
  coords: {
    type: String
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true , 'Debe de existir una referencia a un usuario']
  }

});

postSchema.pre<Ipost>('save', function( next ) {
    this.created = new Date();
    next();
});

interface Ipost extends Document {
  created: Date;
  mensaje: string;
  img: string[];
  coords: string;
  Usuario: string;

}


export const Post = model<Ipost>('Post' , postSchema);
