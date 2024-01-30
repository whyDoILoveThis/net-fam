import { IUser } from "@/types";
import { useEffect, useState } from "react";
import UserDetailsCard from "./UserDetailsCard";
import { useUserContext } from "@/context/AuthContext";

interface Props {
  allUsers: object;
  propUser: IUser;
  isOnPostCard: boolean;
}

const UserCard = ({ allUsers, propUser, isOnPostCard }: Props) => {
  const [clickedUser, setClickedUser] = useState(propUser);
  const [haveWeClickedUser, setHaveWeClickedUser] = useState(false);
  const [addBorderToCurrentUser, setAddBorderToCurrentUser] = useState({});
  const [doDetailsBelongToCurrentUser, setDoDetailsBelongToCurrentUser] =
    useState(false);
  const { user } = useUserContext();

  const handleClickUser = (propUser: object) => {
    setHaveWeClickedUser(true);
    allUsers?.documents.map((eachUser: object) => {
      if (eachUser.$id === propUser.id || eachUser.$id === propUser.$id) {
        setClickedUser(eachUser);
      }
    });
  };

  useEffect(() => {
    if (user?.id === propUser?.$id && !isOnPostCard) {
      setAddBorderToCurrentUser({
        border: "1px solid #3E2FFF",
        backgroundColor: "#3d2fff25",
      });
    }
  }, []);

  useEffect(() => {
    if (user?.id === clickedUser?.$id) {
      setDoDetailsBelongToCurrentUser(true);
    }
  }, [doDetailsBelongToCurrentUser, clickedUser?.$id, user?.id]);
  console.log("prop", propUser);
  console.log("current", user);

  console.log(haveWeClickedUser);
  console.log("🖱🖱🖱", clickedUser);

  return (
    <div className="m-2 h-fit w-full xs:w-full sm:w-fit relative cursor-pointer">
      {haveWeClickedUser ? (
        <div
          style={{ zIndex: "99" }}
          className="fixed -top-16  left-0 w-screen h-screen bg-transparent"
        >
          <UserDetailsCard
            isMyDetails={doDetailsBelongToCurrentUser}
            allUsers={allUsers}
            user={clickedUser}
            setShowDetails={() => setHaveWeClickedUser(false)}
          />
        </div>
      ) : (
        <div
          onClick={() => {
            handleClickUser(propUser);
          }}
          style={addBorderToCurrentUser}
          className={`${
            !isOnPostCard
              ? "flex p-6 gap-3 bg-back-300 items-center  rounded-lg"
              : "flex items-center gap-3"
          } ${doDetailsBelongToCurrentUser && !isOnPostCard && "thisIsMe"}`}
        >
          <img
            src={propUser.imageUrl || "/assets/images/profile-placeholder.svg"}
            alt="profile img"
            className="h-20 w-20 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{propUser.name || "username not found"}</p>
            <p className="small-regular text-light-3">@{propUser.username}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
