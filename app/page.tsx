"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import Results from "../components/Results.";
import Suggestions from "../components/Suggestions";
import { search } from "./actions";

export default function NewPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    name?: string;
  };
}) {
  const [actors, setActors] = useState<Actor[]>([]);
  const [results, setResults] = useState<Result>(undefined);

  const [input, setInput] = useState<string>("");

  const pathname = usePathname();

  const createQueryString = useCallback((name: string, values: Actor[]) => {
    const params = new URLSearchParams(searchParams);

    values.forEach((value) => {
      params.append(name, value.id.toString());
      params.append("name", value.name);
    });

    return params.toString();
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (!searchParams.search) return;

    const actors = Array.isArray(searchParams.search)
      ? searchParams.search.map((id) => ({
          id: parseInt(id),
          name: searchParams.name,
        }))
      : [
          {
            id: parseInt(searchParams.search),
            name: searchParams.name,
          },
        ];

    setActors(actors as unknown as Actor[]);

    search(actors as unknown as Actor[]).then((data) => {
      setResults(data as unknown as Result);
    }) as unknown as Result;
  }, [searchParams.search]);

  const handleClick = (actor: Actor) => {
    if (actors.some((a) => a.id === actor.id)) return;
    setActors([...actors, actor]);
    setInput("");
  };

  const test = async () => {
    const data = (await search(actors)) as Result;
    setResults(data);

    router.push(pathname + "?" + createQueryString("search", actors));
  };

  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="flex mb-2 gap-2">
        {actors.map((actor, index) => (
          <h1
            key={actor.id}
            onClick={() => {
              setActors(actors.filter((_, i) => i !== index));
              setResults(undefined);
            }}
            className="w-36 flex items-center justify-center text-sm border text-center rounded-full border-neutral-500 cursor-pointer hover:bg-red-500">
            {actor.name}
          </h1>
        ))}
      </div>
      <div className="md:w-[800px] flex gap-2 mb-2">
        <Input
          className="border border-neutral-500 px-2 py-1"
          type="text"
          placeholder="Search for an actor..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button disabled={actors.length < 1} onClick={test}>
          Search
        </Button>
      </div>
      {input.length > 0 && (
        <Suspense
          fallback={
            <div className="w-10 h-10 border-2 border-red-600 animate-spin mt-2 border-t-transparent rounded-full"></div>
          }>
          <Suggestions onClick={handleClick} search={input} />
        </Suspense>
      )}
      {results && results.length > 0 && !input.length && (
        <Suspense
          fallback={
            <div className="w-10 h-10 border-2 border-indigo-600 animate-spin mt-2 border-t-transparent rounded-full"></div>
          }>
          <Results actors={actors} results={results} />
        </Suspense>
      )}
    </main>
  );
}
