export default async function tymPage() {
  const tymRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed'
  );
  const recenze = await tymRes.json();

  return (
    <main>

    </main>
  );
}
