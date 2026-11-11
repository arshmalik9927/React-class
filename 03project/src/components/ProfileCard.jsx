import "./ProfileCard.css";

function ProfileCard({username}) {
  console.log(username)
  return (
    <div className="card">
      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="Profile"
        className="profile-img"
      />

      <h2>{username}</h2>
      <p className="role">MERN Stack Developer</p>

      <p className="description">
        Passionate about building modern web applications
        using React, Node.js, Express, and MongoDB.
      </p>

      <div className="skills">
        <span>React</span>
        <span>Node.js</span>
        <span>MongoDB</span>
      </div>

      <button onClick={() => alert("Thanks for connecting!")}>
        Connect
      </button>
    </div>
  );
}

export default ProfileCard;