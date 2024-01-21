import "@styles/globals.css";
import Nav from "@components/Navbar";
import Footer from "@components/Footer";
import Provider from "@components/Provider";

import "./globals.css";
import { Roboto, Inter } from "next/font/google";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "1TV Admin",
  description: "Discover, Fund, Manage & Share Community Projects",
};

const RootLayout = ({ children }) => (
  <html lang='en'>


    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app '>
      <Nav />  <div className=' relative'> 
          {children}</div> 
          <Footer/>
        </main>
      </Provider>

    </body>
  </html>
);

export default RootLayout;
