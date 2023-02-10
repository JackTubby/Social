import Link from 'next/link';
import Image from "next/image";

// Top nav
const Navbar = () => {
  const user = null;
  const username = null;

  return (
    <nav>
      {/* Link to hope page shown to all users */}
      <ul>
        <li>
          <Link href="/">
            <button>FEED</button>
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
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;
