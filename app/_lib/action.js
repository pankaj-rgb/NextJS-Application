//server action files
'use server';

import { signIn } from "./auth";

export async function signInAction(){
    //provider of the signIn
    await signIn('google',{redirectTo:'/account'});
}
