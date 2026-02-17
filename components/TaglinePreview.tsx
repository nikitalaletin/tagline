import React from 'react';
import { observer } from 'mobx-react-lite';
import { taglineStore } from '../stores/taglineStore';
import type { TagSize, TagRadius, TagVariant } from '../types';

const SIZE_MAP: Record<TagSize, string> = {
  'XL': 'px-6 py-3 text-lg',
  'L': 'px-5 py-2.5 text-base',
  'M': 'px-4 py-2 text-sm',
  'S': 'px-3 py-1.5 text-xs',
  'XS': 'px-2 py-1 text-[10px]',
};

const RADIUS_MAP: Record<TagRadius, string> = {
  '0': 'rounded-none',
  '4': 'rounded-sm',
  '8': 'rounded-md',
  '12': 'rounded-lg',
  '100': 'rounded-full',
};

const VARIANT_CLASSES: Record<TagVariant, string> = {
  1: 'bg-[#222222] border border-transparent text-white hover:bg-[#2D2D2D]',
  2: 'bg-[#1A2638] border border-transparent text-[#217EF2] hover:bg-[#21324D]',
  3: 'bg-[#217EF2] border border-transparent text-white hover:bg-[#1C6DD1]',
  4: 'bg-transparent border border-[#333333] text-gray-300 hover:bg-[#1A1A1A]',
};

const ALIGN_MAP = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

export const TaglinePreview: React.FC = observer(() => {
  const { tags, styles } = taglineStore;

  return (
    <div className={`flex flex-wrap gap-3 w-full ${ALIGN_MAP[styles.alignment]}`}>
      {tags.map((tag) => (
        <a
          key={tag.id}
          href={tag.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            transition-[background-color,border-color,color] duration-200 font-medium whitespace-nowrap
            ${SIZE_MAP[styles.size]}
            ${RADIUS_MAP[styles.radius]}
            ${VARIANT_CLASSES[styles.variant]}
          `}
        >
          {tag.label}
        </a>
      ))}
    </div>
  );
});
