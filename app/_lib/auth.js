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

};

//also create route handlers in the api
export const {auth,handlers:{GET,POST}}  =NextAuth(authConfig);