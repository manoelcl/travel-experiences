import "./index.css";

export const ProfileSmall = ({
  user: {
    username = "defaultUser",
    profilePic = "https://pbs.twimg.com/profile_images/589081644989943810/TCsr9vN6_400x400.jpg",
    userId = 5,
  },
}) => {
  return (
    <span className="profile-small">
      <a href={"/users/" + userId}>
        {username}{" "}
        <img
          style={{ width: "1.1rem", height: "1.1rem" }}
          src={profilePic}
          alt={`user ${username} profile pic`}
        />
      </a>
    </span>
  );
};
