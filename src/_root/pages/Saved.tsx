import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {
  const { data: posts, isPending: isPostLoading } = useGetSavedPosts();
  console.log("saved", posts);

  return (
    <div className="flex flex-1 ">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">My Saves</h2>
          {isPostLoading ? (
            <Loader />
          ) : posts?.documents.length === 0 ? (
            <h3>No Posts Saved 🙃</h3>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard key={post.post.caption} post={post.post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Saved;
