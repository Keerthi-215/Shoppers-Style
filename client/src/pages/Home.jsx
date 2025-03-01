import { useState } from "react";
const Home = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  return (
    <div>
      {user && <div>you are an {user.role} </div>}
      {user && user.role === "admin" && (
        <div>you are an admin you can go to this link </div>
      )}
    </div>
  );
};

export default Home;
