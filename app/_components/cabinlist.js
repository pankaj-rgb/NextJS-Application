import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

export default async function  CabinList({filter}){
    /* component for not caching any data for this component , so better than because only 
    this function is dynamic and not whole route and thu
    we make this page only dynamic and thus not make cache for this ( Partial Rendering)  using nostore() */
    // noStore();
    console.log('starting...');
    const cabins = await getCabins();
    // console.log(cabins);
    if(!cabins.length) return null;
    let displayedCabins;
    if(filter==='all') displayedCabins=cabins;
    if(filter==='small') displayedCabins=cabins.filter((cabin)=>cabin.maxCapacity<=3);
    if(filter==='medium') displayedCabins=cabins.filter((cabin)=>(cabin.maxCapacity>=4 && cabin.maxCapacity<=7));
    if(filter==='large') displayedCabins=cabins.filter((cabin)=>cabin.maxCapacity>=8);

    
    return (
        <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {displayedCabins?.map((cabin) => (
              <CabinCard cabin={cabin} key={cabin.id} />
            ))}
          </div>
        </div>
    )
}