import { extractFirstWord, timeAgoConverter } from "@/lib/utils";
import { IUser } from "@/types";
import { Models } from "appwrite";
import DetailsTabs from "./DetailsTabs";

interface Props {
  isMyDetails?: boolean;
  allUsers: object;
  user: IUser;
  setShowDetails: () => boolean;
}

const UserDetailsCard = ({
  isMyDetails,
  allUsers,
  user,
  setShowDetails,
}: Props) => {
  console.log("user", user);

  const liked = user.liked as object[];
  const saved = user.save as Models.Document[];
  const posts = user.posts as object[];

  console.log("posts - ", posts);
  console.log("UserDetailsCard -- allUsers => ", allUsers);

  return (
    <div className="w-screen cursor-default h-screen absolute left-0 top-20 overflow-scroll custom-scrollbar">
      <div className="blur-bg  flex flex-col bg-back-see-thru">
        <h2 className="m-4 h3-bold md:h2-bold flex justify-between">
          {extractFirstWord(user.name)}'s page
          <button onClick={() => setShowDetails()}>
            <img
              className="w-8"
              src="/assets/icons/close-modal-btn.png"
              alt=""
            />{" "}
          </button>
        </h2>
        <div className="">
          <article className="flex  gap-3 w-full flex-col xs:flex-row">
            <img
              className="rounded-br-3xl w-60 h-60 rounded-tr-3xl"
              src={user.imageUrl}
              alt="profileImg"
            />
            <div className="bg-back-300 mr-3 rounded-3xl flex flex-col relative gap-3 items-center w-full">
              <span>
                <p className="h2-bold">{user.name}</p>
                <p className="small-regular text-light-3">@{user.username}</p>
              </span>
              <p>Joined {timeAgoConverter(user.$createdAt)}</p>
              {/** coming soon */}
              <span className="p-6 pt-0 mb-6">
                <b>About me:</b>
                <p style={{ color: "ORANGE" }}>
                  🚧UNDER CONSTRUCTION👷‍♂️{" "}
                  <span className="text-light-1">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsa consequuntur itaque sit nihil eligendi minima eum
                    sapiente at, eos nostrum?
                  </span>{" "}
                </p>
              </span>
              <span className="absolute flex items-center gap-2 left-3 bottom-3">
                <b>Email:</b>
                <p className="small-regular text-light-3">{user.email}</p>
              </span>
            </div>
          </article>
          <DetailsTabs
            theUser={user}
            isMyPosts={isMyDetails}
            allUsers={allUsers}
            myPosts={posts}
            likedPosts={liked}
            savedPosts={saved}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
