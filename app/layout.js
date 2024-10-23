import Logo from "@/app/_components/logo";
import Navigation from "./_components/navigation";

import '@/app/_styles/globals.css'
//we could use any google font without downloading best to download on your server
import {Josefin_Sans} from "next/font/google";
import Header from "./_components/Header";


const josefin=Josefin_Sans({
  subsets:['latin'],
  display:'swap'
})

console.log(josefin);
export const metadata={
  // title:"The wild Oasis",
  title:{
    template:"%s The Wild Oasis",
    default:"Welcome / The Wild Oasis"
  },
  description:"Luxurious Cabin Hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dartk forests",

}


export default function RootLayout({children}){

  return <html lang='en'>
    <body className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}>
      <Header/>
      <div className="flex-1 px-8 py-12">
      <main className="max-w-7xl mx-auto ">
        {children}  
        {/* become layout for all the children component liek the page in which it is present */}
      </main>
      </div>
      
      
    </body>
  </html>
}