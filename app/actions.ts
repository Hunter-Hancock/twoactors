export async function search(actors: { id: number; name: string }[]) {
  const juice = [];

  for (const actor of actors) {
    const url = `https://api.themoviedb.org/3/person/${actor.id}/combined_credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    juice.push(data);
  }

  return juice;
}
