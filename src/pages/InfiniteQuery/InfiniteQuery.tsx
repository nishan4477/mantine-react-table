import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import NameCard from "../../components/NameCard/NameCard";

type TPokemon = {
  count: number;
  next: string;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

const getPokemon = async ({
  pageParam = 0,
}: {
  pageParam: number;
}): Promise<TPokemon> => {
  const res: AxiosResponse<TPokemon> = await axios.get<TPokemon>(
    `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=20`,
  );
  return res.data;
};

const InfiniteQuery = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemon,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // const val=  pages.length * 20;
      const val =
        lastPage.next === null
          ? undefined
          : Number(new URL(lastPage.next).searchParams.get("offset"));

      return val;
    },
  });
  return (
    <div className="w-full h-screen overflow-y-auto bg-slate-800 px-4 py-4">
      <h1 className="text-center text-white font-semibold text-2xl">
        Pokemon Name
      </h1>
      <div className="mt-4">
        {status === "pending" ? (
          <div className="">Loading....</div>
        ) : status === "error" ? (
          <div>{error.message}</div>
        ) : (
          <>
            <div>
              {data?.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.results.map((pokemon, index) => (
                    <NameCard key={index} title={pokemon.name} />
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div>
              <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                className="mx-auto block"
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                    ? "Load More"
                    : "Nothing more to load"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InfiniteQuery;
