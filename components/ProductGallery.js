'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

import { Badge } from '@/components/Badge';

export function ProductGallery({ images, selectedId, onSelect, className = '' }) {
  const selected = images.find((img) => img.id === selectedId) ?? images[0];

  return (
    <div className={`flex flex-col gap-5 sm:gap-6 lg:sticky lg:top-[6.5rem] lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto ${className}`}>
      {/* Main image */}
      <div className="relative overflow-hidden rounded-[2rem] border-2 border-text bg-white shadow-soft aspect-[1/1]">
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
      <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-4 snap-start">
        {images.map((img) => {
          const isSelected = img.id === selectedId;
          return (
              <button
                key={img.id}
                type="button"
                onClick={() => onSelect(img.id)}
                aria-pressed={isSelected}
                aria-label={`View ${img.alt}`}
                className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border aspect-[1/1] sm:h-16 sm:w-auto sm:flex-1 transition-all duration-200 ${
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
                <div className="absolute inset-0 rounded-xl border-2 border-text ring-2 ring-offset-1 ring-teal" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProductGallery;
