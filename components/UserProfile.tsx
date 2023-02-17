// Pass user props & display user data
const UserProfile = ({ user }) => {
  return (
    <div>
      <img src={user.photoURL} alt="Users photo" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
};

export default UserProfile;
