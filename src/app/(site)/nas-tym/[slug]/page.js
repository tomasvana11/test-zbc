export default async function MemberDetailPage({ params }) {
  const { slug } = params;

  const res = await fetch(
    `https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?slug=${slug}&_embed`,
    { next: { revalidate: 10 } } // Optional pro ISR v Next.js
  );

  if (!res.ok) throw new Error('Failed to fetch team member');

  const data = await res.json();
  const member = data[0];

  if (!member) {
    return <p>Člen týmu nenalezen</p>;
  }

  // DEBUG: výpis ACF dat do konzole
  console.log('🔍 ACF:', member.acf);
  console.log('📷 Foto objekt:', member.acf?.team_member_photo);
  console.log('📷 URL:', member.acf?.team_member_photo?.url);

  // Pokus o ziskání URL z ACF pole
  const photo = member.acf?.team_member_photo?.url || '/placeholder.png';
  const name = member.title?.rendered || 'Bez jména';
  const role = member.acf?.role || '';

  return (
    <div className="flex flex-col items-center px-4 py-12 max-w-[1392px] mx-auto">
      <img
        src={photo}
        alt={name}
        onError={(e) => {
          e.currentTarget.src = '/placeholder.png';
        }}
        className="w-64 h-64 rounded-full object-cover mb-6"
      />
      <h2
        className="text-3xl text-goldenBrown mb-2 text-center"
        dangerouslySetInnerHTML={{ __html: name }}
      />
      <p className="text-raisinBlack mb-6">{role}</p>
      {/* Další detaily můžou následovat */}
    </div>
  );
}
