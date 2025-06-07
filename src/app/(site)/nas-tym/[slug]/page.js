export default async function MemberDetailPage({ params }) {
  const { slug } = params;

  const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?slug=${slug}`);
  if (!res.ok) throw new Error('Failed to fetch team member');
  const data = await res.json();
  const member = data[0];

  if (!member) return <p>Člen týmu nenalezen</p>;

  console.log('Member:', member);
  const photo = member.acf?.team_member_photo?.url;
  console.log('Photo URL:', photo);

  return (
    <div>
      {photo ? (
        <img src={photo} alt={member.title.rendered} />
      ) : (
        <p>Fotka není k dispozici</p>
      )}
    </div>
  );
}
