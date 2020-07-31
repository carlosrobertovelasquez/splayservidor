import mongoose from 'mongoose';

const PostSchema =mongoose.Schema({
    titulo:{
        type:String,
        required:true,
        trim:true,
     },
     descripcion:{
        type:String,
        trim:true,
     },
    creado:{
        type:Date,
        default:Date.now()
       },
})

module.exports=mongoose.model('Post',PostSchema)