//server action files alway  be called to auth not in clients
'use server';

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateProfile(formData){
    console.log("formdata ",formData);
    //backend development usr must have authorization and all input as unsafe
    //auth can be easily used because we are on server 
    const session=await auth();
    if(!session) throw new Error('you must be logged in');
    const nationalID=formData.get('nationalID');
    const [nationality,countryFlag]=formData.get('nationality').split('%');
    if(!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error('please provide a  valid national Id');
    const updateData={nationality,countryFlag,nationalID};
    console.log("updated data with nationality ", updateData);
    console.log('update data ',session.user.guestId);
    
    const {data, error}=await supabase.from('guests')
                        .update(updateData)
                        .eq("id",session.user.guestId);
                 
    if (error) {
        throw new Error("guest could not be updated");
    }
    //to refresh in real time on the given url path 
    revalidatePath('/account/profile');

}

//it is not a form but a button so called by using bookingId
export async function deleteReservation(bookingId) {
    const session = await auth();
    if (!session) throw new Error('You must be logged in ');

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }

    revalidatePath('account/reservations');

}

export async function signInAction(){
    //provider of the signIn
    await signIn('google',{redirectTo:'/account'});
}

export async function signOutAction(){
    await signOut({redirectTo:'/'});
}

