function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">Cabin could not be found :(</h1>
      <a
        href="/cabins"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Back to all Cabins &larr;
      </a>
    </main>
  );
}

export default NotFound;
