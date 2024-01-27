import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useGetAllUsers } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const AllUsers = () => {
  const { data: users, isPending } = useGetAllUsers();
  console.log("users", users);

  return (
    <div className="flex flex-wrap relative justify-center h-fit w-full mt-4">
      {isPending ? (
        <Loader />
      ) : (
        <h2 className="m-4 h3-bold md:h2-bold w-full">
          All Users ({users?.total})
        </h2>
      )}
      {users &&
        users?.documents.map((user: Models.Document, index: number) => (
          <UserCard key={index} user={user} />
        ))}
    </div>
  );
};

export default AllUsers;
