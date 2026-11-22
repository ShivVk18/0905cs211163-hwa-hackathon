'use client';

import { Badge } from '@/components/Badge';

export function ProductInfo({ badges, name, description, price }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Feature badges */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {badges.map((badge, i) => (
          <Badge
            key={badge}
            variant="peach"
            size="sm"
            className="text-dark-teal font-medium tracking-tight"
          >
            {badge}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl">
        {name}
      </h1>

      {/* Description */}
      <p className="mt-4 leading-relaxed text-text/70 sm:text-lg">
        {description}
      </p>

      {/* Price */}
      <div className="mt-6 flex items-baseline gap-3 sm:mt-7 sm:gap-4">
        <span className="font-heading text-3xl font-bold text-text sm:text-4xl">
          ₹{price.toLocaleString('en-IN')}
        </span>
        <span className="text-sm font-medium text-text/60 sm:text-base">
          incl. taxes · free delivery
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;
