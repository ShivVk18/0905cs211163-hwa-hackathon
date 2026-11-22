'use client';

const LIFESTYLE_IMAGES = [
  {
    src: '/images/leaving.jpg',
    alt: 'A dog waiting by the door as their owner leaves',
    width: 900,
    height: 687,
    label: 'Busy when they miss you most',
  },
  {
    src: '/images/nap.jpg',
    alt: 'A dog resting peacefully while away',
    width: 900,
    height: 687,
    label: 'Calm enough to nap',
  },
];

export function LifestyleImages() {
  return (
    <section id="lifestyle-images" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
          {LIFESTYLE_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className="relative overflow-hidden rounded-[2rem] border-2 border-text bg-white shadow-soft aspect-[4/3]"
            >
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                decoding="async"
                className="block w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-4 z-10 rounded-full border border-white bg-white px-3 py-1 text-xs font-medium text-dark-teal">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LifestyleImages;
