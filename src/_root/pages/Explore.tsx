import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 0);

  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (!posts) {
    return (
      <div className=" flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const showSearchResults = searchValue !== "";
  const ShowPosts =
    !showSearchResults &&
    posts.pages.every((item) => item?.documents.length === 0);

  console.log(posts);
  console.log("ShowPosts - ", ShowPosts);
  console.log("fetchNextPage - ", fetchNextPage);
  console.log("InView - ", inView);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
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
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medim md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-full">
        {showSearchResults ? (
          <SearchResults
            isSeachFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.documents} />
          ))
        )}
      </div>
      {(hasNextPage && !searchValue) || isSearchFetching ? (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      ) : (
        !hasNextPage &&
        !searchValue && (
          <p className="text-light-4 mt-4 text-center w-full">End of posts</p>
        )
      )}
    </div>
  );
};

export default Explore;
