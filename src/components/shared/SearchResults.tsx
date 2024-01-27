import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />;
  console.log("searchedPosts - ", searchedPosts);

  if (searchedPosts && searchedPosts.documents.length > 0)
    return <GridPostList posts={searchedPosts.documents} />;
  return (
    <>
      {searchedPosts ? (
        <p className="text-light-4 mt-10 text-center w-full">
          No results found 🐳🐔💩
        </p>
      ) : (
        <p>Searching...</p>
      )}
    </>
  );
};

export default SearchResults;
