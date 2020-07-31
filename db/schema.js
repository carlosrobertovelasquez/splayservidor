const {gql}=require('apollo-server-express');

//Schema

const typeDefs=gql`
    type Usuario{
        id:ID
        email:String
        password:String
        telefono:String
        nombre:String
        apellido:String
        sexo:Sexo
        fechanacimiento:String
        foto:String
        favoritos:[Favorito]
        seguidores:[Seguidores]
        activo:String
        confirmado:String
        creado:String
    }

 
    type Seguidores{
        seguidoresId:String
        nombre:String
    }

   type Token{
       token:String
   } 
  enum Sexo{
      MASCULINO,
    FEMENINO
  }

type Favorito{
    id:ID
    nombre:String
    url:String
    estado:String
    creado:String
}


input FavoritoInput{
    nombre:String
    url:String
    estado:String
}

input SeguidoresInput{
    seguidoresId:String
    nombre:String
}



 input UsuarioInput{
        email:String
        telefono:String
        password:String
        nombre:String
        apellido:String
        sexo:String
        fechanacimiento:String
        foto:String
        favoritos:[FavoritoInput]
        seguidores:[SeguidoresInput]
        activo:String
        confirmado:String
       
 }
 input AutenticarInput{
     email:String!
     password:String!
 }




    type Query{
        obtenerUsuario:Usuario
        obtenerFavoritos:[Favorito]
        obtenerFavorito(id:ID!):Favorito
    }
    type Mutation{
        #Usuarios
        nuevoUsuario(input:UsuarioInput):Usuario
        autenticarUsuario(input:AutenticarInput):Token
        
        #Favoritos
       nuevoFavorito(input:FavoritoInput):Favorito
       actualizarFavorito(id:ID!,input:FavoritoInput):Favorito
       eliminarFavorito(id:ID!):String
       
    }
`;

module.exports=typeDefs;