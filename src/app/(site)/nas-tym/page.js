export default async function TymPage() {
  // Fetch dat z REST API
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed'
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  // Připrav pole členů ve formátu { id, photo, name, role }
  const members = data.slice(0, 6).map((item) => {
    // Najdeme media z _embedded, pokud je
    const media = item._embedded?.['wp:attachment']?.[0];
    const photo = media?.source_url || '/placeholder.png';

    return {
      id: item.id,
      photo,
      name: item.title.rendered,
      role: item.acf?.member_motto || '', // nebo jiný field, kde máš roli
    };
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Náš tým</h1>

      <div
        className="
          grid
          grid-cols-2       /* mobile */
          sm:grid-cols-3    /* small screens */
          md:grid-cols-4    /* medium screens */
          lg:grid-cols-6    /* large screens */
          gap-6
        "
      >
        {members.map((member) => (
          <article
            key={member.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
              loading="lazy"
            />
            <h3
              className="text-lg font-semibold mb-1 text-center"
              dangerouslySetInnerHTML={{ __html: member.name }}
            />
            <p className="text-gray-500 text-sm text-center">{member.role}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
