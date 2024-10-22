import Counter from "../components/counter";

export default async function Pages(){

    const res=await fetch('https://jsonplaceholder.typicode.com/users');
    const data=await res.json();


    
    console.log(data);

    return (
        <div>
               {/* <Navigation/>  */}
            <h1>Cabins pages working</h1>
            <ul>{data.map(user=>
                <li key={user.id}>{user.name}</li>
            )}</ul>

            <Counter users={data}/>
        </div>
    );
}

