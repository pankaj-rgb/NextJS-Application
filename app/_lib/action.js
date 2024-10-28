//server action files alway  be called to auth not in clients
'use server';

import { signIn, signOut } from "./auth";

export async function signInAction(){
    //provider of the signIn
    await signIn('google',{redirectTo:'/account'});
}

export async function signOutAction(){
    await signOut({redirectTo:'/'});
}