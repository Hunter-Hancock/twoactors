export default async function ActorPage({
  params,
}: {
  params: { id: string };
}) {
  const url = `https://api.themoviedb.org/3/person/${params.id}?language=en-US&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

  const response = await fetch(url);

  const data = await response.json();

  return (
    <main className="h-screen">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
