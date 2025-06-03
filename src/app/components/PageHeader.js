// src/app/components/PageHeader.js

export default function PageHeader({ title, description }) {
  return (
    <header>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}
