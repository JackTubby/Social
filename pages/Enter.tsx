import { auth, googleAuthProvider } from "@/lib/firebase";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import Background from "./cardbackground.png";

const EnterPage = () => {
  const { user, username } = useContext(UserContext);

  // User can be in three different states
  // 1 user signed out <SignInButton />
  // 2 user signed in, but missing username <UsernameForm />
  // 3 user signed in, has username <SignOutButton/ >

  // Styling for the like counter. Adds rounded border radius to bottom right

  return (
    <main>
      <div className="flex items-center h-screen justify-center">
      <div className="flex flex-row h-96 w-7/12 text-center bg-darkGrey border-4 border-deepGrey rounded-md">
        <div className="w-1/2">ss</div>
        <div className="w-1/2">
          {user ? (
            !username ? (
              <UsernameForm />
            ) : (
              <SignOutButton />
            )
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
      </div>
    </main>
  );
};
export default EnterPage;

// Sign in with Google btn
const SignInButton = () => {
  // Async func that will wait a sign-in with pop-up using the google auth provider.
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button
        className="text-white m-20 bg-purple p-4"
        onClick={signInWithGoogle}
      >
        Sign In with google
      </button>
    </>
  );
};

// Sign out btn
const SignOutButton = () => {
  // Removes the JSON web token
  return (
    <button className="text-white" onClick={() => auth.signOut()}>
      Sign Out
    </button>
  );
};

// Username form for user to select username
const UsernameForm = () => {
  return <h1>FORM</h1>;
};
