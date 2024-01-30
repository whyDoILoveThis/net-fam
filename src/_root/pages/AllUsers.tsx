import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import UserSearchResults from "@/components/shared/UserSearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetAllUsers,
  useSearchUsers,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useState } from "react";

const AllUsers = () => {
  const { data: users, isPending } = useGetAllUsers();

  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 0);

  const { data: searchedPosts, isFetching: isSearching } =
    useSearchUsers(debouncedValue);

  const showSearchResults = searchValue !== "";
  const ShowPosts = !showSearchResults;

  console.log("allShowPosts - ", ShowPosts);
  console.log("users", users);
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className=" h3-bold md:h2-bold w-full">Search Users</h2>
        <div className="flex gap-1 px-4 mb-6 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
          <Input
            type="text"
            placeholder="search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {isPending || (isSearching && !searchedPosts) ? (
          <div className="m-6">
            <Loader />
          </div>
        ) : !showSearchResults ? (
          <h2 className="body-bold md:h3-bold w-full">
            All Users ({users?.total})
          </h2>
        ) : (
          <h2 className="body-bold md:h3-bold w-full">Your Results</h2>
        )}
        <ul className="flex flex-wrap justify-center">
          {users &&
            !showSearchResults &&
            users.documents.map((user: Models.Document, index: number) => (
              <UserCard allUsers={users} key={index} propUser={user} />
            ))}
        </ul>
        <div className="flex flex-wrap gap-9 w-full max-w-full">
          {showSearchResults && (
            <UserSearchResults
              isSeachFetching={isSearching}
              searchedPosts={searchedPosts}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
