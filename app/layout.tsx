import type { Metadata } from "next";

import "../public/styles/globals.css";
import Navbar from "@/components/UI/Navbar";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import { AuthProvider } from "@/providers/auth-store-provider";
import { CartStoreProvider } from "@/providers/cart-store";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "CreativTub",
  description: "Site de prezentare materiale de constructii",

  // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"pr-0"}>
      <body className={` antialiased md:px-8 px-0 bg-gray-500 min-h-screen`}>
        <AuthProvider>
          <CartStoreProvider>
            <div className="flex  flex-col  md:overflow-hidden bg-gradient-to-l from-cyan-400 to-blue-500 ">
              <div className="w-full flex-none  bg-gray-800">
                <Navbar />
              </div>
              <div className="w-full bg-gray-800">
                <Header />
              </div>
              <div className="w-4/5 mx-auto ">
                {/*  <Providers>*/}
                {children}
                {/*  </Providers>*/}
                <ToastContainer />
              </div>
            </div>
            <Footer />
          </CartStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
