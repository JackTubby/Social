import { auth, googleAuthProvider } from "@/lib/firebase";

const EnterPage = () => {
  // We need to know the users auth context to know what to show
  const user = null;
  const username = null;
  // User can be in three different states
  // 1 user signed out <SignInButton />
  // 2 user signed in, but missing username <UsernameForm />
  // 3 user signed in, has username <SignOutButton/ >
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};
export default EnterPage;

// Sign in with Google btn
const SignInButton = () => {
    return (
        <>
        <button className="text-white m-20 bg-purple p-4" onClick={signInWithGoogle}>Sign In with google</button>
        </>
    );
};

// Sign out btn
const SignOutButton = () => {
    // Removes the JSON web token
    return <button className="text-white" onClick={() => auth.signOut()}>Sign Out</button>
};

// Username form for user to select username
const UsernameForm = () => {};
