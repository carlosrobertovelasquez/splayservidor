import express from 'express';
import jwt from 'jsonwebtoken';

require('dotenv').config({path:'variables.env'})
//graphql
import { ApolloServer } from 'apollo-server-express';
const typeDefs =require('./db/schema');
const resolvers =require('./db/resolvers')
const conectarDB=require('./config/db');




//Conectar a la base de datos;

conectarDB();

const app = express();
const server = new ApolloServer({ typeDefs, resolvers,context:({req})=>{
   
    const token=req.headers['authorization'] ||'';
    
    if(token){
        try {
            const usuario =jwt.verify(token.replace('Bearer ',''),process.env.SECRETA)
            //console.log(usuario);
            return {usuario}
        } catch (error) {
          console.log('Hubo un error');
          console.log(error);  
        }
    }

} });

server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => console.log(`El Servidor ApolloServer esta corriendo http://localhost:4000${server.graphqlPath} `));
