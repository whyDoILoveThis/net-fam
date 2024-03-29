import { useUserContext } from "@/context/AuthContext";
import { timeAgoConverter } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import UserCard from "./UserCard";
import { useGetAllUsers } from "@/lib/react-query/queriesAndMutations";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { data: users } = useGetAllUsers();

  console.log("📮📮📮📮📮📮📮📮", users);

  const isRenderedOnPostCard = true;
  const { user } = useUserContext();
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex flex-col items-center gap-3">
          <UserCard
            allUsers={users}
            propUser={post.creator}
            isOnPostCard={isRenderedOnPostCard}
          />
          <div className="flex flex-col">
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {timeAgoConverter(post.$createdAt || "")}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          className={`${user.id !== post.creator.$id && "hidden"}`}
          to={`/update-post/${post.$id}`}
        >
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>
      <Link to={`/post/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2 flex-wrap">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post-img"
          className="post-card_img"
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
