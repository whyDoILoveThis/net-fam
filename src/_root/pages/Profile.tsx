import DetailsTabs from "@/components/shared/DetailsTabs";
import { useGetAllUsers } from "@/lib/react-query/queriesAndMutations";
import { timeAgoConverter } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const { data: users } = useGetAllUsers();
  const isMyDetails = true;

  let user = {};
  users?.documents.map((item) => {
    if (item.$id === id) {
      user = item;
    }
  });

  console.log("🆔", user);
  const liked = user.liked;
  const saved = user.save;
  const posts = user.posts;

  return (
    <div className="overflow-scroll custom-scrollbar mt-10 flex flex-col">
      <h2 className="h3-bold mb-10 mx-5 md:h2-bold text-left flex justify-between">
        My Profile{" "}
        <Link to={`/update-profile/${user.$id}`}>
          <img src="/assets/icons/edit.svg" alt="" />
        </Link>
      </h2>
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                consequuntur itaque sit nihil eligendi minima eum sapiente at,
                eos nostrum?
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
        isMyPosts={isMyDetails}
        allUsers={users}
        myPosts={posts}
        likedPosts={liked}
        savedPosts={saved}
      />
    </div>
  );
};

export default Profile;
