import Cabin from "@/app/_components/cabin";
import Reservation from "@/app/_components/reservation";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import { getBookedDatesByCabinId, getCabin, getCabins, getSettings } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

// PLACEHOLDER DATA
/* const cabin = {
  id: 89,
  name: "001",
  maxCapacity: 2,
  regularPrice: 250,
  discount: 0,
  description:
    "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
  image:
    "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
};
 */
/* 
//metadata for static values
export const metadata={
    title:'Cabin'
} */

//for dynamic values metadata could be design in following manner
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

// for the dynamic page to be as static beforehand
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map(cabin => ({ cabinId: String(cabin.id) }))
  console.log("ids values ", ids)
  return ids;
}

export default async function Page({ params }) {

  const cabin = await getCabin(params.cabinId);
  // const { id, name, maxCapacity, regularPrice, discount, image, description } =
  //   cabin;

  // console.log("value is :" ,params);
  //get the details booked date of the cabin which would be used for future booking
  // const settings=await getSettings(params.cabinId);
  // const bookedDates=await getBookedDatesByCabinId(params.cabinId)

  //in the above one we could see the following would take time each one and thus will wait before rendering when all are different function
  //one approach is to use Promise all together but it would take parallel time so need another approach 
  /* const [cabin,settings,bookedDates]=await Promise.all([
    getCabin(params.cabinId),
    getSettings(),
    getBookedDatesByCabinId(params.cabinId)
  ]); */

  /* call them inside reservation for the settings, bookedDate */

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin}/>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        {/* data selector and reservation form in the cabin id page */}
        {/* <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]"> */}

        {/* we need current booked date of the cabin  */}
        {/* <DateSelector/>
          <ReservationForm/>
        </div> */}

        {/* new approach create a resevation function for the following as the server component so we could use the suspense 
        we could not call the function in client component else they will not be able to find those details  */}

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
