"use client";

import { useState } from "react";

export default function Counter({users}){
    console.log(users);
    const [count, setCount]=useState(0)

    return <div>
        <p>There are {users.length} users</p>
        {/* initially all the rendering for the client or server component is done at server side initially 
        so the data will be shown even though the click functionality takes timne to appear */}
        <button onClick={()=>setCount((c)=>c+1)}>{count}</button>
    </div>
}