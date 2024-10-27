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
            return !!auth?.user; //if user exist true else false
        }
    }

};

//also create route handlers in the api
export const {auth,handlers:{GET,POST}}  =NextAuth(authConfig);

//http://localhost:3000/api/auth/signin  login pages