// import { NextResponse } from "next/server";

/* 
export function middleware(request){
    console.log("middleware ",request);
    return NextResponse.redirect(new URL("/about",request.url));
}  */

//make user to move to particular field
import {auth} from '@/app/_lib/auth';
export const middleware=auth;
export const config={
    // matcher:['/account','/cabins'],
    matcher:['/account']
}
