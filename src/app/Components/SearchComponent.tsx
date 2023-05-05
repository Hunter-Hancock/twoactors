"use client";

import React, { useState } from "react";
import Credit from "../Interfaces/Credit";
import Result from "../Interfaces/Result";
import MovieComponent from "./MovieComponent";

export default function SearchComponent() {
  const [searchActor1, setsearchActor1] = useState("");
  const [searchActor2, setsearchActor2] = useState("");
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [actor1, setActor1] = useState<Result>();
  const [actor2, setActor2] = useState<Result>();
  const [suggestions1, setSuggestions1] = useState<Result[]>([]);
  const [suggestions2, setSuggestions2] = useState<Result[]>([]);
  const [credits1, setCredits1] = useState<Credit[]>([]);
  const [credits2, setCredits2] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const uniqueResults = (results: any) => {
    const uniqueNames = Array.from(
      new Set(results.map((result: any) => result.name))
    );
    const uniqueResults = uniqueNames.map((name) =>
      results.find((result: any) => result.name === name)
    );
    return uniqueResults;
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchBox = event.target.name;

    if (searchBox === "actor1") {
      setsearchActor1(event.target.value);
    } else if (searchBox === "actor2") {
      setsearchActor2(event.target.value);
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.api_key}&language=en-US&query=${event.target.value}&page=1&include_adult=false`
      );
      const data = await response.json();
      if (data.results) {
        const uniqueSuggestions = uniqueResults(data.results);
        if (searchBox === "actor1") {
          setSuggestions1(uniqueSuggestions);
        } else if (searchBox === "actor2") {
          setSuggestions2(uniqueSuggestions);
        }
      } else {
        if (searchBox === "actor1") {
          setSuggestions1([]);
        } else if (searchBox === "actor2") {
          setSuggestions2([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderSuggestions = (searchBox: string) => {
    const suggestions = searchBox === "actor1" ? suggestions1 : suggestions2;

    if (suggestions.length === 0) return null;

    return (
      <ul className="mt-2 border border-gray-300 bg-white rounded align-center">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              if (searchBox === "actor1") {
                setsearchActor1(suggestion.name);
                setSuggestions1([]);
              } else if (searchBox === "actor2") {
                setsearchActor2(suggestion.name);
                setSuggestions2([]);
              }
            }}>
            {suggestion.name}
          </li>
        ))}
      </ul>
    );
  };

  const handleClick = async () => {
    setSearchPerformed(false);
    setLoading(true);
    try {
      // Search for actor 1
      const response1 = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.api_key}&language=en-US&query=${searchActor1}&page=1&include_adult=false`
      );
      const data1 = await response1.json();
      if (data1.results) {
        const selectedActor1 = data1.results[0];
        setActor1(selectedActor1);

        // Get credits for actor 1
        const response2 = await fetch(
          `https://api.themoviedb.org/3/person/${selectedActor1.id}/combined_credits?api_key=${process.env.api_key}&language=en-US`
        );
        const data2 = await response2.json();
        const credits1 = data2.cast;
        setCredits1(credits1);
      } else {
        setActor1(undefined);
      }

      // Search for actor 2
      const response3 = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.api_key}&language=en-US&query=${searchActor2}&page=1&include_adult=false`
      );
      const data3 = await response3.json();
      if (data3.results) {
        const selectedActor2 = data3.results[0];
        setActor2(selectedActor2);

        // Get credits for actor 2
        const response4 = await fetch(
          `https://api.themoviedb.org/3/person/${selectedActor2.id}/combined_credits?api_key=${process.env.api_key}&language=en-US`
        );
        const data4 = await response4.json();
        const credits2 = data4.cast;
        setCredits2(credits2);
      } else {
        setActor2(undefined);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSearchPerformed(true);
      console.log(commonCredits);
    }
  };

  // Find common credits excluding self credits
  const commonCredits = credits1
    .filter(
      (credit1) =>
        credit1.character !== "" &&
        credit1.character !== "Self" &&
        credit1.character !== "Self (archive footage)" &&
        credit1.character !== "Self - Host" &&
        credit1.character !== "Self - Guest" &&
        credit1.character !== "Self (uncredited)" &&
        credits2.some(
          (credit2) =>
            credit2.character !== "" &&
            credit2.character !== "Self" &&
            credit2.character !== "Self (archive footage)" &&
            credit2.character !== "Self - Host" &&
            credit2.character !== "Self - Guest" &&
            credit2.character !== "Self (uncredited)" &&
            credit1.id === credit2.id
        )
    )
    .sort((a, b) => b.vote_count - a.vote_count);

  return (
    <div className="relative">
      <div className="text-center mt-4">
        <h1>See if two actors are in the same movie.</h1>
        <input
          className="border px-3 py-2 rounded mr-2"
          type="text"
          name="actor1"
          value={searchActor1}
          onChange={handleChange}
          placeholder="Enter Actor Name"
        />
        <input
          className="border px-3 py-2 rounded mr-2"
          type="text"
          name="actor2"
          value={searchActor2}
          onChange={handleChange}
          placeholder="Enter Actor Name"
        />
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          Search
        </button>
      </div>

      {renderSuggestions("actor1")}
      {renderSuggestions("actor2")}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {searchPerformed && // only display "No Movies" if a search has been performed
            (commonCredits.length > 0 ? (
              <div>
                <div className="movie-list mt-4 justify-center">
                  {commonCredits.map((result) => (
                    <MovieComponent key={result.id} credit={result} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center">No Movies</p>
            ))}
        </>
      )}
    </div>
  );
}
