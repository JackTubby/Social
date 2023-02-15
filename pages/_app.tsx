import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import BottomNavbar from "../components/BottomnNavbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "@/lib/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <UserContext.Provider value={{user:{}, username: null}}>
      <Navbar />
      <Component {...pageProps} />
      <BottomNavbar />
      <Toaster />
      </UserContext.Provider>
    </>
  );
}
