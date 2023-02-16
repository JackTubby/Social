import { auth, firestore, googleAuthProvider } from "@/lib/firebase";
import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import { UserContext } from "@/lib/context";
import Background from "./cardbackground.png";
import { signOut } from "firebase/auth";

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
      <button>Sign in Anonymously</button>
    </>
  );
};

// Sign out btn
const SignOutButton = () => {
  // Removes the JSON web token
    return <button className="text-white" onClick={() => signOut(auth).catch((e: any) => console.error(e))}>Sign Out</button>;
};

// Username form for user to select username
const UsernameForm = () => {
  // Value user types in
  const [formValue, setFormValue] = useState("");
  // Username is valid selection
  const [isValid, setIsValid] = useState(false);
  // Set loading when we are checking if the username is valid
  const [loading, setLoading] = useState(false);
  // Get user and username from the global context
  const { user, username } = useContext(UserContext);
  useEffect(() => {
    checkUsername(formValue);
  }, [formValue])

  const onChange = (e) => {
    // Force the form value typed in the form to match correct format
    // Get input value
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
    // Check regex is correct
    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  }
  // Check the database for username match after each debounced change
  // useCallback is required for the debounce to work 
  // We do not want to run this fun everytime the form value changes
  // So we use lodash.debounce
  // This prevents the execution of this function from running until the last event has stop running or
  // the last form value has changed after a delay of 500ms (Wait for the user to stop typing for 500ms)
  // Also for this to run with react we have to use the useCallback hook because
  // Anytime React re-renders it creates a new func obj that will not be debounced 
  // Where as use Callback allows the func to be memorised so it can be debounced between state changes.
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        // reference of the doc location
        const ref = firestore.doc(`usernames/${username}`);
        // See if doc exists
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
        // If it does not exist then we know the username is valid
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form>
          {/* user types selected username and bind it to the formValue state */}
          <input type="text" name="username" placeholder="username" value={formValue} onChange={onChange}/>
          <button type="submit" disabled={!isValid}>Choose Username</button>
          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
};
