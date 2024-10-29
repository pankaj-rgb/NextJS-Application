'use client'
import {useFormStatus} from 'react-dom';
import { useState } from "react";
import { updateProfile } from "../_lib/action";



export default function UpdateProfileForm({guest,children}){
    const [count,setCount]=useState();

    const {fullName, email, nationality,nationalID, countryFlag}=guest;
      // CHANGE
  // const countryFlag = "pt.jpg";
  //useFormStatus() we couln't use in component where form is present 

return    <form 
        action={updateProfile}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            name="fullName"
            defaultValue={fullName}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
          name="email"
          defaultValue={email}
            disabled
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <img
              src={countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          </div>

        {/* this component if call here  gives erorr so we would call it as props from server side to client component */}
          {/* <SelectCountry
            name="nationality"
            id="nationality"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultCountry={nationality}
          /> */}

          {children}
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
          defaultValue={nationalID}
            name="nationalID"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>
            <Button/>
        <div className="flex justify-end items-center gap-6">
          
        </div>
      </form>
}

function Button(){
  const {pending}=useFormStatus();
  return <button 
    disabled={pending}
  className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            {pending ?'updating...':'Update profile'}
          </button>
}