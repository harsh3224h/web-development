export default async function Page({ params }) {
  const { id } = await params;

  return (
    <h1>
      Post ID: <span>{id}</span>
    </h1>
  );
}
