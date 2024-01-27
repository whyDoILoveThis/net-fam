import { IUser } from "@/types";
import { Link } from "react-router-dom";
import Loader from "./Loader";

interface Props {
  user: IUser;
}

const UserCard = ({ user }: Props) => {
  return (
    <div className="m-2">
      <Link
        to={`/profile/${user.id}`}
        className="flex gap-3 bg-back-300 items-center p-3 rounded-lg"
      >
        {!user.name ? (
          <Loader />
        ) : (
          <>
            <img
              src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
              alt="profile img"
              className="h-20 w-20 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name || "username not found"}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </>
        )}
      </Link>
    </div>
  );
};

export default UserCard;
