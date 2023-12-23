"use client";

import SearchComponent from "@/components/SearchComponent";
import Image from "next/image";
import { useState } from "react";
import { Actor, Credit, Result } from "../types";

export default function Home() {
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [searchActors, setSearchActors] = useState<Actor[]>([]);
  const [actorResults, setActorResults] = useState<Actor[]>([]);
  const [creditResults, setCreditResults] = useState<Credit[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = async () => {
    setSearched(false);
    setCreditResults([]);

    let allCredits = [];

    for (const actor of actorResults) {
      const url = `https://api.themoviedb.org/3/person/${actor.id}/combined_credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      const sortedData = data.cast.sort(
        (a: Credit, b: Credit) => b.vote_count - a.vote_count
      );
      allCredits.push(sortedData);

      const commonCredits = allCredits.reduce((common, credits) => {
        return common.filter((commonCredit: Credit) =>
          credits.some((credit: Credit) => credit.id === commonCredit.id)
        );
      });

      setCreditResults(commonCredits);
      setSearched(true);
    }
  };

  const handleClick = async (actor: Actor) => {
    if (activeIndex !== null) {
      await updateSearchTerms(activeIndex, actor.name);
      setActorResults([...actorResults, actor]);
      setSearchActors([]);
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  const updateSearchTerms = async (index: number, value: string) => {
    const newSearchTerms = [...searchTerms];
    newSearchTerms[index] = value;
    setSearchTerms(newSearchTerms);

    if (value === "") {
      // Remove the actor from actorResults if the search term is cleared
      const newActorResults = actorResults.filter(
        (_, actorIndex) => actorIndex !== index
      );
      setActorResults(newActorResults);
    } else {
      const url = `https://api.themoviedb.org/3/search/person?query=${value}&include_adult=false&language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

      const response = await fetch(url);
      const data = (await response.json()) as Result;

      setSearchActors(data.results);
    }
  };

  const addSearchBox = () => {
    setSearchTerms([...searchTerms, ""]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-xl">See if actors are in the same movie or show</h1>
      <div className="flex flex-col space-y-5 items-center justify-center pt-5">
        {searchTerms.map((term, index) => (
          <SearchComponent
            key={index}
            label={`Actor ${index + 1}`}
            onFocus={() => handleFocus(index)}
            onChange={async (value) => await updateSearchTerms(index, value)}
            value={searchTerms[index]}
          />
        ))}
      </div>
      {searchActors?.length > 0 && (
        <div className="flex flex-col space-x-10 py-3 px-2 border border-white">
          <ul>
            {searchActors.map((actor, index) => (
              <li
                className={`cursor-pointer text-xl ${
                  index < searchActors.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
                key={index}
                onClick={() => handleClick(actor)}>
                <Image
                  alt={actor.name}
                  width={300}
                  height={450}
                  className="w-20 inline pr-5"
                  src={
                    actor.profile_path != null
                      ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${actor.profile_path}`
                      : "https://images.wondershare.com/repairit/aticle/2021/07/resolve-images-not-showing-problem-1.jpg"
                  }
                />
                {actor.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex space-x-10 pt-5">
        <button
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold"
          onClick={addSearchBox}>
          Add Actor
        </button>
        <button
          className="rounded-sm bg-blue-500 px-4 py-2 font-bold"
          onClick={handleSearch}>
          Search
        </button>
      </div>
      {searched && creditResults.length > 0 && (
        <div className="flex flex-wrap space-x-5 text-center text-xl justify-center pt-5 text-clip overflow-hidden">
          {creditResults.map((credit, index) => (
            <div className="flex flex-col space-y-5 py-5" key={index}>
              <Image
                width={300}
                height={450}
                alt={
                  credit.title ? credit.title : credit.name ? credit.name : ""
                }
                src={`https://www.themoviedb.org/t/p/w1280/${credit.poster_path}`}
              />
              <h1>{credit.title ? credit.title : credit.name}</h1>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
