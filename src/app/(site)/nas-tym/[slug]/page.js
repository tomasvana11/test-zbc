/*// app/tym/[slug]/page.js
import React from 'react';

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
    <div className="flex flex-col items-center ">
      <section className='px-4 max-w-[1392px] mx-auto py-12 flex flex-col lg:flex-row gap:10 lg:gap-20'>
        <div className='flex flex-col shrink-0'>
        <img src={photo} alt={name} className="w-64 h-64 rounded-full object-cover mb-6" />
        <h2 className="text-3xl text-goldenBrown mb-2" dangerouslySetInnerHTML={{ __html: name }} />
        <p className="text-raisinBlack mb-4">{role}</p>
        </div>

        <hr className="border-lightDivGrey lg:hidden"/>

        <div className='flex flex-col gap-2 w-full max-w-[800px]'> 

        <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Jaký příběh mě přivedl k tomu, že pomáhám lidem s financemi?</h3>
        {team_member_story && <p>{team_member_story}</p>}
        <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Na co jsem v životě fakt pyšný?</h3>
        {team_member_proud && <p>{team_member_proud}</p>}
        <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Věta, která mě drží i ve chvíli, kdy je toho moc.</h3>
        {team_member_motto && <p> {team_member_motto}</p>}
        <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Ponaučení, které bych předal svému mladšímu já.</h3>
        {team_member_lesson && <p>{team_member_lesson}</p>}
        <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Co mi na mojí práci dává největší smysl a proč bych jí neměnil?</h3>
        {team_member_meaning && <p>{team_member_meaning}</p>}
        <h3 className="text-2xl text-goldenBrown mt-4 font-recife">S jakými lidmi si nejvíce sednu a proč?</h3>
        {team_member_friends && <p>{team_member_friends}</p>}
        <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Jaký je můj „signature“ style, když jde o práci. </h3>
        {team_member_signature && <p>{team_member_signature}</p>}
        <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Kde všude se semnou můžete potkat naživo?</h3>
        {team_member_location && <p>{team_member_location}</p>}
        <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Možnost i spolupráce online?</h3>
        {team_member_online && <p>{team_member_online}</p>}
        </div>
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
                  >
                    <option value="" disabled hidden>
                      Vyberte poradce
                    </option>
                    {members.map((m) => (
                      <option
                        key={m.id}
                        value={m.slug}
                        selected={m.slug === slug} 
                      >
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
    </div>
  );
}*/
// app/tym/[slug]/page.js
import React from 'react';

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

  const isWoman = member.acf?.team_member_is_woman === true;

  return (
    <div className="flex flex-col items-center ">
      <section className='px-4 max-w-[1392px] mx-auto py-12 flex flex-col lg:flex-row gap:10 lg:gap-20'>
        <div className='flex flex-col shrink-0'>
          <img src={photo} alt={name} className="w-64 h-64 rounded-full object-cover mb-6" />
          <h2 className="text-3xl text-goldenBrown mb-2" dangerouslySetInnerHTML={{ __html: name }} />
          <p className="text-raisinBlack mb-4">{role}</p>
        </div>

        <hr className="border-lightDivGrey lg:hidden"/>

        <div className='flex flex-col gap-2 w-full max-w-[800px]'> 
          <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Jaký příběh mě přivedl k tomu, že pomáhám lidem s financemi?</h3>
          {team_member_story && <p>{team_member_story}</p>}

          <h3 className="text-2xl text-goldenBrown mt-4 font-recife">
            {isWoman ? 'Na co jsem v životě fakt pyšná?' : 'Na co jsem v životě fakt pyšný?'}
          </h3>
          {team_member_proud && <p>{team_member_proud}</p>}

          <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Věta, která mě drží i ve chvíli, kdy je toho moc.</h3>
          {team_member_motto && <p>{team_member_motto}</p>}

          <h3 className="text-2xl text-goldenBrown mt-4 font-recife">
            {isWoman
              ? 'Ponaučení, které bych předala svému mladšímu já.'
              : 'Ponaučení, které bych předal svému mladšímu já.'}
          </h3>
          {team_member_lesson && <p>{team_member_lesson}</p>}

          <h3 className="text-2xl text-goldenBrown mt-4 font-recife">
            {isWoman
              ? 'Co mi na mojí práci dává největší smysl a proč bych jí neměnila?'
              : 'Co mi na mojí práci dává největší smysl a proč bych jí neměnil?'}
          </h3>
          {team_member_meaning && <p>{team_member_meaning}</p>}

          <h3 className="text-2xl text-goldenBrown mt-4 font-recife">S jakými lidmi si nejvíce sednu a proč?</h3>
          {team_member_friends && <p>{team_member_friends}</p>}

          <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Jaký je můj „signature“ style, když jde o práci. </h3>
          {team_member_signature && <p>{team_member_signature}</p>}

          <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Kde všude se semnou můžete potkat naživo?</h3>
          {team_member_location && <p>{team_member_location}</p>}

          <h3 className="text-2xl text-goldenBrown mt-4 font-recife">Možnost i spolupráce online?</h3>
          {team_member_online && <p>{team_member_online}</p>}
        </div>
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
                  >
                    <option value="" disabled hidden>
                      Vyberte poradce
                    </option>
                    {members.map((m) => (
                      <option
                        key={m.id}
                        value={m.slug}
                        selected={m.slug === slug}
                      >
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
    </div>
  );
}
