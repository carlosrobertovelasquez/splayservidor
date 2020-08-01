// Aqui ponemos todas las peticiones de los modelos
const Usuario =require('../models/Usuario');
const Favorito =require('../models/Favorito');
const Post =require('../models/Post');
const Pageseven =require('../models/Pageseven');
const bcryptjs =require( 'bcryptjs');
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
require('dotenv').config({path:'variables.env'})

const crearToken=(usuario,secreta,expiresIn)=>{
 const {id,email,nombre,apellido}=usuario;

 return jwt.sign({id,email,nombre,apellido},secreta,{expiresIn})
}

const resolvers ={
    Query:{
        obtenerUsuario:async (_,{},ctx)=>{
           return ctx.usuario
        },
        obtenerFavoritos:async ()=>{
            try {
                const favoritos=await Favorito.find({});
                return favoritos
            } catch (error) {
                console.log(error)
            }
        },
        obtenerFavorito:async (_,{id})=>{
            // revisar si el  favorito existe
            const favorito=await Favorito.findById(id);
            if(!favorito){
                throw new Error('Favorito no encontrado');
            }
            return favorito
        }
    },
    Mutation:{
        nuevoUsuario:async(_,{ input })=>{
           const newUser=input;
           newUser.email=newUser.email.toLowerCase();

           const {email,password}=newUser;
            //Revisar si el Correo ya existe en la base de datos
            const existeEmail=await Usuario.findOne({email});
            if(existeEmail){
                throw new Error('El Correo ya esta registrado');
            }
           //Hashear su password
        const hash = await bcrypt.hash(password, 10);
          input.password=hash
           try {
           //Guardar en la base de Datos
           const usuario =new Usuario(input)
           usuario.save();//guardado   
           return usuario 
           } catch (error) {
               console.log(error)
           }
        },
        autenticarUsuario:async (_,{input})=>{
            //Si el usuario existe
            const {email,password}=input
            const existeUsuario = await Usuario.findOne({email});
            if(!existeUsuario){
                throw new Error('El Usuario no existe');
            }
            // Revisar si el password es correcto
              const passwordCorrecto = await bcryptjs.compare(password,existeUsuario.password);
              if(!passwordCorrecto){
                  throw new Error('El Password es Incorrecto')
              }
            //Crear el token
            return {
                token:crearToken(existeUsuario,process.env.SECRETA,'24h')
            }
        },
        nuevoFavorito:async(_,{input})=>{
            try {
                const favoirto=new Favorito(input)
                //almacenar en la bs
                const resultado =await favoirto.save()
                return resultado; 
            } catch (error) {
                console.log(error)
                
            }
        },
        actualizarFavorito:async(_,{id,input})=>{
            let favorito =await Favorito.findById(id)
            if(!favorito){
                throw new Error('Favorito no existe')
            }
            // guardar en base de datos
            favorito=await Favorito.findOneAndUpdate({_id:id},input,{new:true});
            return favorito;
        },
        eliminarFavorito:async(_, {id})=>{
            let favorito =await Favorito.findById(id)
           
            if(!favorito){
                throw new Error("Favorito no existe")
            }
            //eliminar
            await Favorito.findOneAndDelete({_id:id})

            return "Favorito Eliminado"
        }
    }
}

module.exports =resolvers;