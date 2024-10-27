import LoginMessage from "@/app/_components/LoginMessage";
import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export default async function Reservation({cabin}) {
    const [settings,bookedDates]=await Promise.all([
        
        getSettings(),
        getBookedDatesByCabinId(cabin.id)
      ]);

      const session=await auth();

      console.log(" session inside reservation form ", session);

    return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">

    {/* we need current booked date of the cabin  */}
    <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin}/>
    {session?.user ? <ReservationForm cabin={cabin} user={session.user}/> : <LoginMessage/>}
  </div>)
}