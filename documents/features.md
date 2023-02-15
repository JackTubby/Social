# Features
## User Authentication
If the user is logged in  then we will also retrieve that users profile document from firestore.
1. Get firebase user.
2. Fetch document from DB.
We minimilise the amount of reads for the feature, by setting up the auth data in a global contex. Meaning it is available for every page before the page is even rendered. This will equal one read.
### How will the user sign-in?
The user will sign-in with Google and which point they will be authenticated by FireBase. We will then require then to select a username. 
### How will we validate the username?
We will have two documents in the FireStore database.
1. A users collection.
Which is the public facing user document and will contain a username field.
2. A username collection.
This will contain an id that matches the selected username. Which has a field with the Firebase auth user id.
So here we have a reverse mapping meaning we can look up a user from the username document or a username document from the user document.