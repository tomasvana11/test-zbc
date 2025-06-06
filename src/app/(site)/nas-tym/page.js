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
        <section className="px-4 w-full">
        <div className="max-w-[1392px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
            {members.map((member) => (
                <article
                    key={member.id}
                    className="flex flex-col w-full items-center"
                >
                    <img
                        src={member.photo}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover mb-4"
                        loading="lazy"
                    />
                    <h3
                        className="text-[18px] md:text-[20px] text-goldenBrown recife mb-1 text-center"
                        dangerouslySetInnerHTML={{ __html: member.name }}
                    />
                    <p className="text-gray-500 text-sm text-center">{member.role}</p>
                </article>
            ))}
        </div>
        </section>
    </main>
  );
}
