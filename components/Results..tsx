import Image from "next/image";
import Link from "next/link";

export default async function Results({
  results,
  actors,
}: {
  results: Result;
  actors: Actor[];
}) {
  let allCredits = [];

  for (const result of results!) {
    const sortedData = result.cast.sort(
      (a: Credit, b: Credit) => b.vote_count - a.vote_count
    );
    allCredits.push(sortedData);
  }

  const commonCredits = allCredits.reduce((common, credits) => {
    return common.filter((commonCredit: Credit) =>
      credits.some((credit: Credit) => credit.id === commonCredit.id)
    );
  });

  return (
    <div className="flex flex-row flex-wrap gap-x-20 gap-y-10 text-center text-xl justify-center pt-5 text-clip">
      {commonCredits.filter(
        (c, i) =>
          !c.genre_ids.includes(10763) &&
          !c.genre_ids.includes(10767) &&
          c.genre_ids.length > 0 &&
          c.poster_path != null
      ).length === 0 && actors.length > 1 ? (
        <h1 className="text-2xl">Nothing In Common</h1>
      ) : (
        commonCredits
          .filter(
            (c, i) =>
              !c.genre_ids.includes(10763) &&
              !c.genre_ids.includes(10767) &&
              c.genre_ids.length > 0 &&
              c.poster_path != null
          )
          .map((result, index) => (
            <Link
              href={`https://www.themoviedb.org/${result.media_type}/${result.id}`}
              className="flex flex-col max-w-80 border-2 cursor-pointer rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out"
              key={index}>
              <Image
                alt={`${result.title} poster`}
                width={300}
                height={450}
                className="w-full rounded-md"
                src={`https://www.themoviedb.org/t/p/w1280/${result.poster_path}`}
                unoptimized
              />
              <h1 className="my-5 px-2">
                {result.title ? result.title : result.name}
              </h1>
            </Link>
          ))
      )}
    </div>
  );
}
