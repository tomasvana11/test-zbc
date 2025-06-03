export default function PageHeader({ title, description }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold">{page_name}</h1>
      {description && <p className="text-lg text-gray-600">{page_desc}</p>}
    </header>
  );
}
