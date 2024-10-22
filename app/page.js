import Link from "next/link";
import Navigation from "./components/navigation";

export default function Page() {
  return (

    <div>
      <Navigation/>
      <h1>The wild oasis. Welcome to Paradise</h1>
      <Link href="/cabins">Explore luxry Cabins</Link>
    </div>
  );



   }
