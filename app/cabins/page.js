import { Suspense } from "react";
import CabinList from "../_components/cabinlist";
import Spinner from "../_components/Spinner";



//to remove the cache from the server to store the data and show near time changes
// export const revalidate=0;

//give time to revalidate after a period of time incrmental static Regeneration when you are sure that the data changes not very often
//but this would work only in the prod env ( npm run prod)
// export const revalidate=15;
export const revalidate=3600; 
/* for an hour revalidate 60*60 */

export const metadata = {
    title: "cabins",
}

export default async function Page() {
    // CHANGE
    
  
    return (
      <div>
        <h1 className="text-4xl mb-5 text-accent-400 font-medium">
          Our Luxury Cabins
        </h1>
        <p className="text-primary-200 text-lg mb-10">
          Cozy yet luxurious cabins, located right in the heart of the Italian
          Dolomites. Imagine waking up to beautiful mountain views, spending your
          days exploring the dark forests around, or just relaxing in your private
          hot tub under the stars. Enjoy nature&apos;s beauty in your own little home
          away from home. The perfect spot for a peaceful, calm vacation. Welcome
          to paradise.
        </p>
        <Suspense fallback={<Spinner/>}>

        <CabinList/>
        </Suspense>
      </div>
    );
  }
  