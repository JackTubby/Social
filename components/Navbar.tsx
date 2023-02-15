import Link from "next/link";
import Image from "next/image";
import { useContext } from 'react';
import { UserContext } from "@/lib/context";

// Top nav
const Navbar = () => {

  const { user, username } = useContext(UserContext);

  return (
    <nav className="flex pt-5 bg-black h-30" aria-label="top navbar">
      <h1 className="pl-10 text-white inline-block align-middle">Social</h1>
      {/* Link to hope page shown to all users */}
      <ul className="absolute right-10">
        <div className="flex">
          <li className="pr-10">
            <Link href="/">
              <button className="text-white">Feed</button>
            </Link>
          </li>
          {/* user is signed-in and has username */}
          {username && (
            <>
              {/* Link to admin page */}
              <li>
                <Link href="/admin">
                  <button>Write Posts</button>
                </Link>
              </li>
              {/* Link to the profile page */}
              <li>
                {/* Interpolate in a string with the user's username */}
                <Link href={`/${username}`}>
                  <img src={user?.photoURL} />
                </Link>
              </li>
            </>
          )}

          {/* user is not signed OR has not created username */}
          {!username && (
            <li>
              {/* Link to sign-in page */}
              <Link href="/enter">
                <button className="text-white">Log in</button>
              </Link>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};
export default Navbar;
