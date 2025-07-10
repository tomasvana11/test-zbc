/*

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
      <section>
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
      </section>
      <section className="bg-silkBeige w-full py-12 md:py-16">
  <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center">Kontaktujte nás</h2>
  <p className="text-center text-raisinBlack">Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong></p>
  
  <div className="flex flex-col w-full max-w-[1392px] mx-auto py-4 md:py-8 justify-center">


    

    <form
  action="https://formcarry.com/s/kY_1MuRL2um"
  method="POST"
  encType="multipart/form-data"
  className="mx-auto p-6 space-y-5 w-full max-w-[850px]"
  target="_self" noValidate
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <select
      name="typ"
      id="typ"
      required
      className="hidden"
    >
      <option value="klient" selected></option>
    </select>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="Jméno"
        required
        className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
      />
    </div>
    <div>
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Příjmení"
        required
        className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
      />
    </div>
    <div>
      <input
        type="tel"
        name="phone"
        id="phone"
        placeholder="Telefon"
        required
        className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
      />
    </div>
    <div>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
        className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
      />
    </div>

    <div className="md:col-span-2 md:flex md:justify-center">
  <div className="relative w-full md:w-1/2">  
    <select
  name="role"
  id="role"
  required
  className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
  style={{ color: '#747271' }}
>
  <option value="" disabled selected hidden>Vyberte poradce</option>
  {members.map((member) => (
    <option key={member.id} value={member.slug}>
      {member.name.replace(/(<([^>]+)>)/gi, '')}
    </option>
  ))}
</select>

    <div
      className="pointer-events-none absolute inset-y-[9px] right-[9px] flex items-center justify-center rounded"
      style={{
        width: '28px',
        height: '22px',
        backgroundColor: '#9D6219',
      }}
    >
      <img
        src="/images/chevron-down.svg"
        alt="šipka"
        className="w-4 h-4"
        style={{ display: 'block' }}
      />
    </div>
  </div>
</div>




    
  </div>
  <div className="w-full flex justify-center">
    <button
      type="submit"
      className="w-full md:w-auto md:mt-[24px] bg-goldenBrown text-white py-2 px-6 rounded font-satoshi-bold"
    >
      Kontaktujte mě
    </button>
  </div>
</form>
  <p className="text-cardGrey text-center w-full max-w-[850px] p-6 m-auto">Odesláním formuláře berete na vědomí podmínky zpracování osobních údajů uvedené v informaci o zpracování osobních údajů</p>
  </div>

      </section>

    </div>
    
  );
}

*/
/*
import PageHeader from '../../../components/PageHeader';

// Fetch všech členů týmu pro select
async function fetchAllMembers() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed',
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch team members');
  const data = await res.json();

  return data.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.title.rendered,
    role: item.acf?.role || '',
    photo: item.acf?.team_member_photo?.url || '/placeholder.png',
    description: item.acf?.description || '',
  }));
}

// Fetch metadata stránky týmu (pro hlavičku apod.)
async function fetchMetaPageData() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=nas-tym&_embed',
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const page = data[0];
  const acf = page?.acf || {};
  return {
    title: acf.seo_title || page?.title?.rendered || 'Náš tým',
    description: acf.seo_description || '',
  };
}

export async function generateMetadata({ params }) {
  // můžeš upravit metadata na základě člena, ale tady použijeme metadata týmu
  const meta = await fetchMetaPageData();
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function MemberDetailPage({ params }) {
  const { slug } = params;

  const members = await fetchAllMembers();
  const member = members.find((m) => m.slug === slug);

  if (!member) {
    return <p>Člen týmu nebyl nalezen.</p>;
  }

  const meta = await fetchMetaPageData();

  return (
    <div>
      <PageHeader title={meta.title} description={meta.description} />

      <main className="max-w-[900px] mx-auto px-4 py-12">
        <section className="flex flex-col items-center">
          <img
            src={member.photo}
            alt={member.name.replace(/(<([^>]+)>)/gi, '')}
            className="w-48 h-48 rounded-full object-cover mb-6"
          />
          <h1
            className="text-4xl text-goldenBrown mb-2"
            dangerouslySetInnerHTML={{ __html: member.name }}
          />
          <p className="text-xl text-raisinBlack mb-4">{member.role}</p>
          {member.description && (
            <div
              className="text-base text-raisinBlack mb-8"
              dangerouslySetInnerHTML={{ __html: member.description }}
            />
          )}

          <form
            action="https://formcarry.com/s/kY_1MuRL2um"
            method="POST"
            className="w-full max-w-md"
          >
            <label htmlFor="role" className="block mb-2 font-semibold">
              Vyberte poradce
            </label>
            <select
              id="role"
              name="role"
              required
              defaultValue={member.slug}
              className="w-full p-2 rounded border border-gray-300"
            >
              <option value="" disabled hidden>
                Vyberte poradce
              </option>
              {members.map((m) => (
                <option key={m.id} value={m.slug}>
                  {m.name.replace(/(<([^>]+)>)/gi, '')}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="mt-6 bg-goldenBrown text-white py-2 px-4 rounded w-full"
            >
              Kontaktujte mě
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
*/

// app/tym/[slug]/page.jsx
import React from 'react';
import { useParams } from 'next/navigation';


async function fetchMember(slug) {
  const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?slug=${slug}&_embed`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch team member');
  const data = await res.json();
  return data[0];
}

async function fetchMembers() {
  const res = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?_embed&per_page=100', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch team members list');
  const data = await res.json();
  return data.map(m => ({
    id: m.id,
    slug: m.slug,
    name: m.title.rendered.replace(/(<([^>]+)>)/gi, ''),
  }));
}

export default async function MemberDetailPage({ params }) {
  const { slug } = params;

  const member = await fetchMember(slug);
  if (!member) {
    return <p>Člen týmu nenalezen</p>;
  }

  const members = await fetchMembers();

  const photo = member.acf?.team_member_photo?.url || 'https://via.placeholder.com/300';
  const name = member.title.rendered;
  const role = member.acf?.role || '';
  

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
      <section>
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
      </section>

      <section className="bg-silkBeige w-full py-12 md:py-16">
  <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center">Kontaktujte nás</h2>
  <p className="text-center text-raisinBlack">
    Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong>
  </p>

  <div className="flex flex-col w-full max-w-[1392px] mx-auto py-4 md:py-8 justify-center">
    <form
      action="https://formcarry.com/s/kY_1MuRL2um"
      method="POST"
      encType="multipart/form-data"
      className="mx-auto p-6 space-y-5 w-full max-w-[850px]"
      target="_self"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <select name="typ" id="typ" required className="hidden" defaultValue="klient">
            <option value="klient"></option>
          </select>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Jméno"
            required
            className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Příjmení"
            required
            className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Telefon"
            required
            className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
          />
        </div>

        <div className="md:col-span-2 md:flex md:justify-center">
          <div className="relative w-full md:w-1/2">
            <select
              name="role"
              id="role"
              required
              className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
              style={{ color: '#747271' }}
              defaultValue={slug}  
            >
              <option value="" disabled hidden>
                Vyberte poradce
              </option>
              {members.map((m) => (
                <option key={m.id} value={m.slug}>
                  {m.name}
                </option>
              ))}
            </select>

            <div
              className="pointer-events-none absolute inset-y-[9px] right-[9px] flex items-center justify-center rounded"
              style={{
                width: '28px',
                height: '22px',
                backgroundColor: '#9D6219',
              }}
            >
              <img
                src="/images/chevron-down.svg"
                alt="šipka"
                className="w-4 h-4"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="w-full md:w-auto md:mt-[24px] bg-goldenBrown text-white py-2 px-6 rounded font-satoshi-bold"
        >
          Kontaktujte mě
        </button>
      </div>
    </form>
    <p className="text-cardGrey text-center w-full max-w-[850px] p-6 m-auto">
      Odesláním formuláře berete na vědomí podmínky zpracování osobních údajů uvedené v informaci o zpracování osobních údajů
    </p>
  </div>
</section>


      {/*<section className="bg-silkBeige w-full py-12 md:py-16">
        <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center">Kontaktujte nás</h2>
        <p className="text-center text-raisinBlack">Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong></p>

        <div className="flex flex-col w-full max-w-[1392px] mx-auto py-4 md:py-8 justify-center">
          <form
            action="https://formcarry.com/s/kY_1MuRL2um"
            method="POST"
            encType="multipart/form-data"
            className="mx-auto p-6 space-y-5 w-full max-w-[850px]"
            target="_self"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <select
                  name="typ"
                  id="typ"
                  required
                  className="hidden"
                  defaultValue="klient"
                >
                  <option value="klient"></option>
                </select>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Jméno"
                  required
                  className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Příjmení"
                  required
                  className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Telefon"
                  required
                  className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                />
              </div>

              <div className="md:col-span-2 md:flex md:justify-center">
                <div className="relative w-full md:w-1/2">
                  <select
                    name="role"
                    id="role"
                    required
                    className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
                    style={{ color: '#747271' }}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>Vyberte poradce</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.slug}>
                        {m.name}
                      </option>
                    ))}
                  </select>

                  <div
                    className="pointer-events-none absolute inset-y-[9px] right-[9px] flex items-center justify-center rounded"
                    style={{
                      width: '28px',
                      height: '22px',
                      backgroundColor: '#9D6219',
                    }}
                  >
                    <img
                      src="/images/chevron-down.svg"
                      alt="šipka"
                      className="w-4 h-4"
                      style={{ display: 'block' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="w-full md:w-auto md:mt-[24px] bg-goldenBrown text-white py-2 px-6 rounded font-satoshi-bold"
              >
                Kontaktujte mě
              </button>
            </div>
          </form>
          <p className="text-cardGrey text-center w-full max-w-[850px] p-6 m-auto">
            Odesláním formuláře berete na vědomí podmínky zpracování osobních údajů uvedené v informaci o zpracování osobních údajů
          </p>
        </div>
      </section>*/}
      
      
    </div>
  );
}
