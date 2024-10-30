'use client'
import {useOptimistic} from 'react';
import { deleteReservation } from '../_lib/action';
import ReservationCard from './ReservationCard';
function ReservationList({bookings}){
    //useOptimistic hook  always 2 state , one acutal and one it is function as delete
    //when no async function performed
    const [optimisticBookings, optimisticDelete]= 
    useOptimistic(bookings,(curBookings, bookingId)=>{
        return curBookings.filter(booking=>
            booking.id!=bookingId
        );

    });

    //optimisticDelete when delete is done

    async function handleDelete(bookingId){
        //immediate delete from the UI 
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