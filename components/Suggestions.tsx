import Image from "next/image";
export default async function Suggestions({
  search,
  onClick,
}: {
  search: string;
  onClick: (actor: Actor) => void;
}) {
  const url = `https://api.themoviedb.org/3/search/person?query=${search}&include_adult=false&language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

  const response = await fetch(url);

  const data = await response.json();

  const results = data.results as Actor[];

  return (
    <div className="md:w-[800px] flex flex-col w-72 gap-2">
      {results
        .filter((r, i) => r.profile_path !== null)
        .slice(0, 5)
        .map((result) => (
          <div
            key={result.id}
            className="flex items-center gap-2 border-2 border-neutral-300 cursor-pointer rounded-md hover:shadow-sm"
            onClick={() => onClick(result)}>
            <img
              alt={`${result.name} profile`}
              className="md:h-[500px] h-40 rounded-sm"
              src={`https://image.tmdb.org/t/p/w500/${result.profile_path}`}
            />
            <h1 className="md:text-4xl text-center w-full">{result.name}</h1>
          </div>
        ))}
    </div>
  );
}
