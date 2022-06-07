import "./index.css";

export const ProfileSmall = ({
  userName = "defaultUser",
  profilePic = "https://pbs.twimg.com/profile_images/589081644989943810/TCsr9vN6_400x400.jpg",
  userId = 5,
}) => {
  return (
    <p className="profile-small">
      <a href={"/users/" + userId}>
        {userName}{" "}
        <img
          style={{ width: "1.5rem", height: "1.5rem" }}
          src={profilePic}
          alt={`user ${userName} profile pic`}
        />
      </a>
    </p>
  );
};
