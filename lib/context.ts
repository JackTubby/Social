import { createContext } from "react";

// Create userContext that init the conext with a default value
export const UserContext = createContext({user: null, username: null});
// Provided in the _app.tsx