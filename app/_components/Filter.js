'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"


export default function Filter(){

    //import from navigation only 
    const searchParams=useSearchParams();

    //for route changes need to use following again from navigation
    const router=useRouter();
    //now path name needed 
    const pathname=usePathname();

    const activeFilter=searchParams.get('capacity')??'all';

    function handleFilter(filter){
        // console.log('filter values ', filter);
        //now need to pass this value to URL use URLSearchparams 
        const params=new URLSearchParams(searchParams);
        params.set('capacity',filter);
        //show those changes in the URL replace the URL scroll is set to false prevent page from scroll to above
        router.replace(`${pathname}?${params.toString()}`,{scroll:false});
    }
    return (
        <div className="border border-primary-800 flex">
                {/* <button className="px-5 py-2 hover:bg-primary-700" onClick={()=>handleFilter('all')}> All Cabins</button>
                <button className="px-5 py-2 hover:bg-primary-700" onClick={()=>handleFilter('small')}> 1&mdash;3 guests</button>
                <button className="px-5 py-2 hover:bg-primary-700" onClick={()=>handleFilter('medium')}> 4&mdash;7 guests</button>
                <button className="px-5 py-2 hover:bg-primary-700"onClick={()=>handleFilter('large')}> 8&mdash;12 guests</button> */}

                {/* create a common button with the following option and then call it from here */}
                <Button filter='all' handleFilter={handleFilter} activeFilter={activeFilter}>All Cabins</Button>
                <Button filter='small' handleFilter={handleFilter} activeFilter={activeFilter}>1&mdash;3 guests</Button>
                <Button filter='medium' handleFilter={handleFilter} activeFilter={activeFilter}>4&mdash;7 guests</Button>
                <Button filter='large' handleFilter={handleFilter} activeFilter={activeFilter}>8&mdash;12 guests</Button>

        </div>
    )
}

function Button({filter,activeFilter,handleFilter, children}){
    return <button className={`px-5 py-2 hover:bg-primary-700 ${filter===activeFilter ? 'bg-primary-700 text-primary-50':''}`} 
     onClick={()=>handleFilter(filter)}
     > {children}</button>
}