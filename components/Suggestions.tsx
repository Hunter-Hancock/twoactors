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

  const results = (data.results as Actor[]).slice(0, 5);

  return (
    <div className="flex flex-col w-72 gap-2">
      {results
        .filter((r, i) => r.profile_path !== null)
        .map((result) => (
          <div
            key={result.id}
            className="flex items-center gap-2 border-2 border-neutral-300 cursor-pointer rounded-sm hover:shadow-sm"
            onClick={() => onClick(result)}>
            <img
              className="h-40 rounded-sm"
              src={`https://image.tmdb.org/t/p/w200/${result.profile_path}`}
            />
            <h1 className="text-center w-full">{result.name}</h1>
          </div>
        ))}
    </div>
  );
}
