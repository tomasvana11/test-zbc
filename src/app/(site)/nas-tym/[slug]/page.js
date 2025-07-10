/*export default async function MemberDetailPage({ params }) {
  const { slug } = params;

  const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?slug=${slug}&_embed`);
  if (!res.ok) throw new Error('Failed to fetch team member');

  const data = await res.json();
  const member = data[0];

  if (!member) {
    return <p>Člen týmu nenalezen</p>;
  }

  // Tady taháme URL fotky z ACF pole team_member_photo
  const photo = member.acf?.team_member_photo?.url || 'https://via.placeholder.com/300';

  const name = member.title.rendered;
  const role = member.acf?.role || '';

  return (
    <div className="flex flex-col items-center px-4 py-12 max-w-[1392px] mx-auto">
      <img src={photo} alt={name} className="w-64 h-64 rounded-full object-cover mb-6" />
      <h2 className="text-3xl text-goldenBrown mb-2" dangerouslySetInnerHTML={{ __html: name }} />
      <p className="text-raisinBlack mb-6">{role}</p>
    </div>
  );
}*/

export default async function MemberDetailPage({ params }) {
  const { slug } = params;

  const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?slug=${slug}&_embed`);
  if (!res.ok) throw new Error('Failed to fetch team member');

  const data = await res.json();
  const member = data[0];

  if (!member) {
    return <p>Člen týmu nenalezen</p>;
  }

  const photo = member.acf?.team_member_photo?.url || 'https://via.placeholder.com/300';
  const name = member.title.rendered;
  const role = member.acf?.role || '';

  // Další ACF pole
  const {
    team_member_story,
    team_member_proud,
    team_member_motto,
    team_member_lesson,
    team_member_meaning,
    team_member_friends,
    team_member_signature,
    team_member_location,
    team_member_online,
  } = member.acf || {};

  return (
    <div className="flex flex-col items-center px-4 py-12 max-w-[1392px] mx-auto">
      <img src={photo} alt={name} className="w-64 h-64 rounded-full object-cover mb-6" />
      <h2 className="text-3xl text-goldenBrown mb-2" dangerouslySetInnerHTML={{ __html: name }} />
      <p className="text-raisinBlack mb-4">{role}</p>

      {team_member_story && <p><strong>Příběh:</strong> {team_member_story}</p>}
      {team_member_proud && <p><strong>Hrdost:</strong> {team_member_proud}</p>}
      {team_member_motto && <p><strong>Motto:</strong> {team_member_motto}</p>}
      {team_member_lesson && <p><strong>Životní lekce:</strong> {team_member_lesson}</p>}
      {team_member_meaning && <p><strong>Význam práce:</strong> {team_member_meaning}</p>}
      {team_member_friends && <p><strong>Co říkají přátelé:</strong> {team_member_friends}</p>}
      {team_member_signature && <p><strong>Podpis:</strong> {team_member_signature}</p>}
      {team_member_location && <p><strong>Lokace:</strong> {team_member_location}</p>}
      {team_member_online && <p><strong>Online spolupráce:</strong> {team_member_online}</p>}
    </div>
  );
}

