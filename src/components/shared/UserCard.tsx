import { IUser } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserDetailsCard from "./UserDetailsCard";

interface Props {
  user: IUser;
}

const UserCard = ({ user }: Props) => {
  const [clickedUser, setClickedUser] = useState({});
  const [haveWeClickedUser, setHaveWeClickedUser] = useState(false);

  const handleClickUser = () => {
    setHaveWeClickedUser(true);
  };

  console.log(haveWeClickedUser);

  return (
    <div className="m-2">
      {haveWeClickedUser ? (
        <UserDetailsCard
          user={clickedUser}
          setShowDetails={setHaveWeClickedUser}
        />
      ) : (
        <div
          onClick={() => {
            setClickedUser(user);
            handleClickUser();
          }}
          to={`/profile/${user.id}`}
          className="flex p-6 gap-3 bg-back-300 items-center p-3 rounded-lg"
        >
          <img
            src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
            alt="profile img"
            className="h-20 w-20 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name || "username not found"}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
