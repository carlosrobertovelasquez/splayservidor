import mongoose from 'mongoose';

const FavoritoSchema =mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true,
     },
     url:{
        type:String,
        required:true,
        trim:true,
        
     },
     estado:{
      type:String,
      default:'A'
     },
     creado:{
        type:Date,
        default:Date.now()
       },
})

module.exports=mongoose.model('Favorito',FavoritoSchema)