import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { timeAgoConverter } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

  function handleDeletePost(
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    throw new Error("Function not implemented.");
  }

  //satisfy typescript
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
                <Link
                  className="flex gap-3 items-center"
                  to={`/profile/${post?.creator.$id}`}
                >
                  <img
                    src={
                      post?.creator.imageUrl ||
                      "/assets/icons/profile-placeholer.svg"
                    }
                    className="rounded-full w-8 lg:h-12"
                  />
                  <div className="flex flex-col">
                    <p className="base-medium lg:body-bold text-light-1">
                      {post?.creator.name}
                    </p>
                    <div className="flex-center gap-2 text-light-3">
                      <p className="subtle-semibold lg:small-regular">
                        {post && timeAgoConverter(post.$createdAt || "8888")}
                      </p>
                      -
                      <p className="subtle-semibold lg:small-regular">
                        {post?.location}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="flex-center ">
                  <Link
                    className={`${user.id !== post?.creator.$id && "hidden"}`}
                    to={`update-post/${post?.$id}`}
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
