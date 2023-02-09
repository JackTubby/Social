import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Loader from "../components/Loader"
export default function Home() {
  return ( 
  <>
    <Link prefetch={false} href={{
      pathname: '/[username]',
      query: {username: 'Jack_000'},
    }}>Jacks Profile</Link>
    <Loader show={false}></Loader>
  </>
  );
}
