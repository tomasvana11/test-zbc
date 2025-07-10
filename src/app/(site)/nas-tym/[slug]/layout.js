import PageHeader from '../../../components/PageHeader';
//import Menu from '../../../components/Menu';


export default async function MemberLayout({ children, params }) {
  const { slug } = params;

  const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?slug=${slug}&_embed`);
  if (!res.ok) throw new Error('Failed to fetch team member');
  const data = await res.json();
  const member = data[0];

  if (!member) {
    return <p>Člen týmu nenalezen</p>;
  }

  const name = member.title.rendered;
  const role = member.acf?.role || '';

  return (
    <>
      <Menu/>
      <PageHeader
        title={name}
        description={role}
      />
      <main>{children}</main>
    </>
  );
}
