// components/SmoothScrollButton.js
'use client';

export default function SmoothScrollButton({ targetId, children, className }) {
  const handleClick = (e) => {
    e.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}

// Alternativa - použití v career page přímo jako inline funkce:
// V CareerPage komponente nahraďte Link za toto:

{/* Primární tlačítko - Volné pozice */}
<button
  onClick={(e) => {
    e.preventDefault();
    const element = document.getElementById('volne-pozice');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }}
  className="w-full sm:w-auto custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige inline-flex items-center justify-center text-center cursor-pointer"
>
  Volné pozice
  <img
    src="/images/chevron-down.svg"
    alt="šipka"
    className="w-4 h-4 ml-2"
  />
</button>