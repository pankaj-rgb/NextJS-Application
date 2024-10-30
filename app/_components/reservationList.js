'use client'
import {useOptimistic} from 'react';
import { deleteReservation } from '../_lib/action';
import ReservationCard from './ReservationCard';
function ReservationList({bookings}){
    //useOptimistic hook  always 2 state , one acutal and one it is function as delete
    //when no async function performed , optimisticDelete will trigger the function like dispatch function 
    const [optimisticBookings, optimisticDelete]= 
    //first argument current state--bookings, secoind argument state update function , current state and next compute of next function  of asyync function and same argument
    useOptimistic(bookings,(curBookings, bookingId)=>{
        return curBookings.filter(booking=>
            booking.id!=bookingId
        );

    });

    //optimisticDelete when delete is done

    async function handleDelete(bookingId){
        //immediate delete from the UI , optimitically and then actual delete from the function 
        optimisticDelete(bookingId);
        
        await deleteReservation(bookingId);

    }

    return (
        <ul className="space-y-6">
          {/* {bookings.map((booking) => ( */}
            {optimisticBookings.map((booking) => (
            <ReservationCard booking={booking}
            onDelete={handleDelete}
            key={booking.id} />
          ))}
        </ul>
    )
}
export default ReservationList;