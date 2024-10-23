import Logo from "@/app/_components/logo";
import Navigation from "./_components/navigation";



export const metdata={
  title:'The wild Oasis',
}


export default function RootLayout({children}){

  return <html lang='en'>
    <body>
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