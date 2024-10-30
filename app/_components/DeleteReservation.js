'use client'
import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteReservation } from '../_lib/action';
import { useTransition } from 'react';
import SpinnerMini from './SpinnerMini';

function DeleteReservation({ bookingId ,onDelete}) {
  //we could have the server action since it is a server component but if it is called by the client component it automatically becomes client component
  //since this is not aform but a button we couldn't call the server action from form action but instead from button

  //useTransition hook for the  delete one callback function
  const [isPending, startTransition]= useTransition();
  function handleDelete(){
    if(confirm('Are you sure you want to delete this reservation ? '))
    // startTransition(()=> deleteReservation(bookingId));
  startTransition(()=>onDelete(bookingId));
  }
  return (
    <button onClick={handleDelete}  className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'>
      {!isPending ? <>
      <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
      <span className='mt-1'>Delete</span>
      </> : <span className='mx-auto'><SpinnerMini/></span>}
    </button>
  );
}

export default DeleteReservation;
