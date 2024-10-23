import Logo from "@/app/_components/logo";
import Navigation from "./_components/navigation";

import '@/app/_styles/globals.css'

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
    <body className="bg-primary-950 text-primary-100 min-h-screen">
      <Logo/>
      <Navigation/>
      <main>
        {children}  
        {/* become layout for all the children component liek the page in which it is present */}
      </main>
      <footer>Copyright by the Wild Oasis</footer>
    </body>
  </html>
}