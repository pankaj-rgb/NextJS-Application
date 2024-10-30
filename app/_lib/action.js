//server action files alway  be called to auth not in clients
'use server';

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";


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

    // await new Promise((res)=>setTimeout(res,2000));
    // throw new Error();

    const session = await auth();
    if (!session) throw new Error('You must be logged in ');

    //only user will delete his  data only booking and to prevent other user to use the  details from the curl or rest api hits
    const guestBooking=await getBookings(session.user.guestId);
    const guestBookingIds=guestBooking.map((booking)=>booking.id);
    if(!guestBookingIds.includes(bookingId))
        throw new Error('you are not allowed to delete this booking');


    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }

    revalidatePath('account/reservations');

}

export async function updateBooking(formData) {
    console.log(formData);

    const bookingId=Number(formData.get('bookingId'));
    //Authentication
  const session = await auth();
    if (!session) throw new Error('You must be logged in ');

    //only user will delete his  data only booking and to prevent other user to use the  details from the curl or rest api hits
    //2.Authorization
    const guestBooking=await getBookings(session.user.guestId);
    const guestBookingIds=guestBooking.map((booking)=>booking.id);
    if(!guestBookingIds.includes(bookingId))
        throw new Error('you are not allowed to delete this booking');

    //3) Update Data
    const updateData={
        numGuests:Number(formData.get('numGuests')),
        observations:formData.get('observations').slice(0,1000)
    };
    

    //4) Mutation
   const {  error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

    //5) error handling
  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
//6) revalidate need to change the path where value got modified
revalidatePath(`/account/reservations/edit/${bookingId}`)

  //7) redirecting
  redirect('/account/reservations')
  
}

export async function signInAction(){
    //provider of the signIn
    await signIn('google',{redirectTo:'/account'});
}

export async function signOutAction(){
    await signOut({redirectTo:'/'});
}

