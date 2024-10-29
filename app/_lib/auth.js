import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import { createGuest, getGuest } from "./data-service";

const authConfig={
    providers:[
        Google({
            clientId:process.env.AUTH_GOOGLE_ID,
            clientSecret:process.env.AUTH_GOOGLE_SECRET,
    })],
    //for database credentials 
    // CredentialProvider 
    callbacks:{
        authorized({auth,requests}){
            console.log("auth user ",auth?.user);
            return !!auth?.user; //if user exist true else false
        },
        async signIn({user, account, profile}){
          try{
            console.log("sign in user ",user);
            const existingGuest=await getGuest(user.email);
            console.log("existing users ",existingGuest);
            if(!existingGuest) 
                await createGuest({ email: user.email, fullName: user.name });
            return true;
          }catch{ 
            console.log("error comes here");
            return false; }  
        },
        async session({ session, user }) {
            const guest = await getGuest(session.user.email);
            session.user.guestId = guest.id;
            return session;
          },
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