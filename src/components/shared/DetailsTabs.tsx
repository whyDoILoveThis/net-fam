import { IUser } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { Link } from "react-router-dom";

interface Props {
  theUser?: IUser;
  isMyPosts?: boolean;
  allUsers: object;
  myPosts?: object;
  likedPosts: object;
  savedPosts: object;
}

const DetailsTabs = ({
  theUser,
  isMyPosts,
  allUsers,
  myPosts,
  likedPosts,
  savedPosts,
}: Props) => {
  console.log("⌚⌛⏳❤🍒🍒 saved", savedPosts);
  console.log("⌚⌛⏳❤🍇🍇 likedPosts", likedPosts);

  return (
    <div className=" px-1 pt-20 pb-20 flex flex-col w-full">
      <Tabs defaultValue="liked">
        <TabsList className="flex bg-back-300 rounded-full m-2">
          {isMyPosts && (
            <TabsTrigger
              className="data-[state=active]:focus:bg-dark-2 rounded-full"
              value="mine"
            >
              My Posts
            </TabsTrigger>
          )}
          <TabsTrigger
            className="data-[state=active]:focus:bg-dark-2 rounded-full"
            value="liked"
          >
            Liked
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:focus:bg-dark-2 rounded-full"
            value="saved"
          >
            Saved
          </TabsTrigger>
        </TabsList>
        {isMyPosts && (
          <TabsContent className="w-full" value="mine">
            <div className="flex flex-wrap gap-2 w-full justify-center">
              {myPosts?.map((post: object) => (
                <li key={post.$id} className="relative min-w-72 h-72">
                  <Link to={`/post/${post.$id}`} className="grid-post_link">
                    <img
                      src={post.imageUrl}
                      alt="post"
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="grid-post_user">
                    <div className="flex items-center justify-start gap-2 flex-1">
                      <img
                        className="w-11 h-11 rounded-full"
                        src={theUser?.imageUrl}
                        alt=""
                      />

                      <p>{theUser?.name}</p>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </TabsContent>
        )}
        <TabsContent value="liked">
          <h2 className="h3-bold m-4 ml-10">Posts I Like</h2>
          <div className="flex flex-wrap gap-2 w-full justify-center">
            {likedPosts?.map((post: object) => (
              <li key={post.$id} className="relative min-w-72 h-72">
                <Link to={`/post/${post.$id}`} className="grid-post_link">
                  <img
                    src={post.imageUrl}
                    alt="post"
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="grid-post_user">
                  <div className="flex items-center justify-start gap-2 flex-1">
                    <img
                      className="w-11 h-11 rounded-full"
                      src={post.creator?.imageUrl}
                      alt=""
                    />

                    <p>{post.creator?.name}</p>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </TabsContent>
        <TabsContent className="w-full" value="saved">
          <h2 className="h3-bold m-4 ml-10">My Saves</h2>
          <div className="flex flex-wrap gap-2 w-full justify-center">
            {savedPosts?.map((post: object, index: number) => (
              <li key={post.$id} className="relative min-w-72 h-72">
                <Link to={`/post/${post.post.$id}`} className="grid-post_link">
                  <img
                    src={post.post.imageUrl}
                    alt="post"
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="grid-post_user">
                  <div className="flex items-center justify-start gap-2 flex-1">
                    <img
                      className="w-11 h-11 rounded-full"
                      src={theUser?.imageUrl}
                      alt=""
                    />

                    <p></p>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailsTabs;
