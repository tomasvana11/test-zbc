// app/about/page.js
async function getKarty() {
  const res = await fetch('https://api.zabohatsicesko.cz/wp-json/acf/v3/pages/13', {
    cache: 'no-store', // vypne cache, vždy aktuální data
  });
  const data = await res.json();

  // Vracíme pouze položky s layoutem "karta"
  return data.acf.karty.filter((item) => item.acf_fc_layout === 'karta');
}

export default async function AboutPage() {
  const karty = await getKarty();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Titulek ke kartám</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {karty.map((karta, index) => (
          <article
            key={index}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{karta.jmeno_karty}</h2>
            <p>{karta.popisek_karty}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
