import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

//route handlers for the GET for the cabinId
export async function GET(request,{params}){
    // console.log(request);
    // console.log(params);

    const {cabinId}=params;
    try{
        const [cabin,bookedDate]=await Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)]);
        return Response.json({cabin,bookedDate});
    }
    catch{
        return Response.json({message:"cabin not found"})
    }
    
}