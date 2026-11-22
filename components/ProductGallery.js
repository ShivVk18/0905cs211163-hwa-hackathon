'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

import { Badge } from '@/components/Badge';

export function ProductGallery({ images, selectedId, onSelect }) {
  const selected = images.find((img) => img.id === selectedId) ?? images[0];

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-[2rem] border-2 border-text bg-white shadow-soft aspect-[1/1] max-w-full">
        <Badge
          variant="peach"
          size="sm"
          className="absolute top-4 left-4 z-20 font-medium tracking-tight"
        >
          Product
        </Badge>
        <img
          src={selected.src}
          alt={selected.alt}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          className="block w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 sm:overflow-visible sm:flex-wrap snap-start">
        {images.map((img) => {
          const isSelected = img.id === selectedId;
          return (
              <button
                key={img.id}
                type="button"
                onClick={() => onSelect(img.id)}
                aria-pressed={isSelected}
                aria-label={`View ${img.alt}`}
                className={`relative shrink-0 overflow-hidden rounded-xl border aspect-[1/1] w-10 h-10 sm:w-16 sm:h-16 transition-all duration-200 ${
                  isSelected
                    ? 'border-text shadow-card'
                    : 'border-transparent hover:border-text/40'
                } snap-start`}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="block w-full h-full object-cover"
              />
              {isSelected && (
                <div className="absolute inset-0 rounded-2xl border-2 border-text ring-2 ring-offset-1 ring-teal" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProductGallery;
