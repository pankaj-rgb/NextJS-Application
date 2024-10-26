'use client'
import { createContext, useContext, useState } from "react";

const ReservationContext=createContext();
const initialState={from:undefined,to:undefined}

function ReservationProvider({children}){
//now we will provide range values here for the details which would be use through out the project 
const [range,setRange]=useState(initialState);
const resetRange=()=>setRange(initialState);
return <ReservationContext.Provider value={{range,setRange,resetRange}}>
    {children}
</ReservationContext.Provider>

}


//use customHook to use the above value 
function useReservation(){
    const context=useContext(ReservationContext);
    if(context===undefined) throw new Error('context was used outside provider');
    return context;
}

export {ReservationProvider,useReservation};