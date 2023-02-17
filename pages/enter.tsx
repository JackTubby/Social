import { auth, firestore, googleAuthProvider } from "@/lib/firebase";
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore';
import { useEffect, useState, useCallback, useContext } from 'react';
// import debounce from 'lodash.debounce';
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
// Username form
function UsernameForm(): JSX.Element | null {
  // Value user types in
  const [formValue, setFormValue] = useState('');
  // Username is valid selection
  const [isValid, setIsValid] = useState(false);
  // Set loading when we are checking if the username is valid
  const [loading, setLoading] = useState(false);
// Get user and username from the global context
  const { user, username } = useContext(UserContext);

  const onSubmit = async (e: any) => {
      e.preventDefault();

      // Create refs for both documents
      const userDoc = doc(getFirestore(), 'users', user.uid);
      const usernameDoc = doc(getFirestore(), 'usernames', formValue);

      // Commit both docs together as a batch write.
      const batch = writeBatch(getFirestore());
      batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit().catch((e: any) => console.error(e));
  };

  const onChange = (e: any): void => {
      // Force form value typed in form to match correct format
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
  };

  const [timer] = useState(0);

  // Check the database for username match after each debounced change
  // useCallback is required for the debounce to work 
  // We do not want to run this fun everytime the form value changes
  // So we use lodash.debounce
  // This prevents the execution of this function from running until the last event has stop running or
  // the last form value has changed after a delay of 500ms (Wait for the user to stop typing for 500ms)
  // Also for this to run with react we have to use the useCallback hook because
  // Anytime React re-renders it creates a new func obj that will not be debounced 
  // Where as use Callback allows the func to be memorised so it can be debounced between state changes.
  const checkUsername = useCallback((username: string): void => {
      //debounce(async () => {
      clearTimeout(timer);
      setTimeout(async () => {
          if (username.length >= 3) {
            // reference of the doc location
              const ref = doc(getFirestore(), 'usernames', username);
              // See if doc exists
              const snap = await getDoc(ref);
              // If it does not exist then we know the username is valid
              console.log('Firestore read executed!', snap.exists());
              setIsValid(!snap.exists());
              setLoading(false);
          }
      }, 500);
      // }, 500)
  }, [timer]);

  useEffect((): void => {
      checkUsername(formValue);
  }, [formValue, checkUsername]);


  return (
      !username && (
          <section>
              <h3>Choose Username</h3>
              <form onSubmit={onSubmit}>
                  <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
                  <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
                  <button type="submit" className="btn-green" disabled={!isValid}>
                      Choose
                  </button>

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
  ) || null;
}

function UsernameMessage({ username, isValid, loading }: { username: string, isValid: boolean, loading: boolean }): JSX.Element {
  if (loading) {
      return <p>Checking...</p>;
  } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
  } else {
      return <p></p>;
  }
}
