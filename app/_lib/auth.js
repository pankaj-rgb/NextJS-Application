import NextAuth from "next-auth";
import Google from "next-auth/providers/google"

const authConfig={
    providers:[
        Google({
            clientId:process.env.AUTH_GOOGLE_ID,
            clientSecret:process.env.AUTH_GOOGLE_SECRET,
    })],
    //for database credentials 
    // CredentialProvider 
    callback:{
        authorized({auth,requests}){
            console.log("auth user ",auth?.user);
            return !!auth?.user; //if user exist true else false
        }
    },
    pages:{
        signIn:"/login",
    },

};

//also create route handlers in the api
export const {auth,
    signIn,
    signOut,
    handlers:{GET,POST}}  =NextAuth(authConfig);

//http://localhost:3000/api/auth/signin  login pages