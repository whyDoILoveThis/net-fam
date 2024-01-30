import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import UserCard from "@/components/shared/UserCard";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetAllUsers,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { timeAgoConverter } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();
  const { data: users } = useGetAllUsers();

  const {
    mutate: deletePost,
    isPending: isPendingDelete,
    isSuccess: isDeleted,
  } = useDeletePost();

  const handleDeletePost = () => {
    deletePost({ postId: id || "", imageId: post?.imageId });
  };

  if (isDeleted) {
    navigate(-1);
  }

  console.log("?????????", post);

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />
          <div className="flex-between">
            <div className="post_details-info">
              <div className="flex-between w-full">
                <div className="flex flex-wrap">
                  <UserCard
                    allUsers={users}
                    propUser={post?.creator}
                    isOnPostCard={true}
                  />
                  <div className="flex-center text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {post && timeAgoConverter(post.$createdAt || "8888")}
                    </p>

                    <p className="subtle-semibold lg:small-regular">
                      &nbsp;-&nbsp;{post?.location}
                    </p>
                  </div>
                </div>

                <div className="flex-center ml-3">
                  <Link
                    className={`${user.id !== post?.creator.$id && "hidden"}`}
                    to={`/update-post/${post?.$id}`}
                  >
                    {" "}
                    <img
                      style={{
                        border: "1px solid grey",
                        borderRadius: "10px",
                        padding: "0.2rem",
                      }}
                      width={27}
                      src="/assets/icons/edit.svg"
                    />
                  </Link>
                  <Button
                    style={{ padding: "0.7rem", paddingRight: "0" }}
                    onClick={handleDeletePost}
                    variant="ghost"
                    className={`"ghost_details-delete_btn" ${
                      user.id !== post?.creator.$id && "hidden"
                    }`}
                  >
                    {isPendingDelete || isDeleted ? (
                      <Loader />
                    ) : (
                      <img
                        style={{
                          border: "1px solid grey",
                          borderRadius: "10px",
                          padding: "0.2rem",
                        }}
                        src="/assets/icons/delete.svg"
                        alt="delete"
                        width={27}
                      />
                    )}
                  </Button>
                </div>
              </div>
              <hr className="border w-full border-dark-4/80" />
              <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
                <p>{post?.caption}</p>
                <ul className="flex gap-1 mt-2 flex-wrap">
                  {post?.tags.map((tag: string) => (
                    <li key={tag} className="text-light-3">
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full">
                <PostStats post={post} userId={user.id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
