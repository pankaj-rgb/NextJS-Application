import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export default async function Reservation({cabin}) {
    const [settings,bookedDates]=await Promise.all([
        
        getSettings(),
        getBookedDatesByCabinId(cabin.id)
      ]);

    return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">

    {/* we need current booked date of the cabin  */}
    <DateSelector/>
    <ReservationForm/>
  </div>)
}