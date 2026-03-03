import React from 'react';
import {
  TaglineStyles,
  TagSize,
  TagRadius,
  TagAlignment,
  TagVariant,
} from '../../../types';
import { PanelHeader } from '../shared';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export interface StylesViewProps {
  styles: TaglineStyles;
  onBack: () => void;
  onClose: () => void;
  onUpdate: (styles: TaglineStyles) => void;
}

const SIZES: TagSize[] = ['XL', 'L', 'M', 'S', 'XS'];
const RADII: TagRadius[] = ['0', '4', '8', '12', '100'];
const ALIGNMENTS: TagAlignment[] = ['left', 'center', 'right'];

const sectionBorder = { borderColor: 'rgba(233, 236, 246, 0.07)' };
const labelStyle = {
  fontFamily: 'Onest, sans-serif',
  lineHeight: '140%',
} as const;

export const StylesView: React.FC<StylesViewProps> = ({
  styles,
  onBack,
  onClose,
  onUpdate,
}) => {
  const update = <K extends keyof TaglineStyles>(key: K, value: TaglineStyles[K]) => {
    onUpdate({ ...styles, [key]: value });
  };

  return (
    <div className="flex flex-col h-full">
      <PanelHeader title="Styles" compact onBack={onBack} onClose={onClose} />

      <div className="p-3 overflow-y-auto text-left flex flex-col gap-4">
        <StyleVariantSection styles={styles} onUpdate={update} />
        <SizeSection sizes={SIZES} value={styles.size} onChange={(s) => update('size', s)} />
        <RadiusSection radii={RADII} value={styles.radius} onChange={(r) => update('radius', r)} />
        <AlignmentSection
          alignments={ALIGNMENTS}
          value={styles.alignment}
          onChange={(a) => update('alignment', a)}
        />
      </div>
    </div>
  );
};

function StyleVariantSection({
  styles,
  onUpdate,
}: {
  styles: TaglineStyles;
  onUpdate: (key: 'variant', value: TagVariant) => void;
}) {
  return (
    <div className="space-y-2">
      <label
        className="block text-[14px] font-bold text-white text-left"
        style={labelStyle}
      >
        Style
      </label>
      <div className="flex gap-[10px]">
        {([1, 2, 3, 4] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onUpdate('variant', v)}
            className={`flex-1 h-[37px] rounded-[6px] flex items-center justify-center text-[10px] font-bold border-2 box-border ${
              v === 1
                ? 'bg-[rgba(255,255,255,0.1)] text-white'
                : v === 2
                  ? 'bg-[rgba(21,123,218,0.2)] text-[#7DBEF5]'
                  : v === 3
                    ? 'bg-[rgba(21,123,218,0.93)] text-white'
                    : 'bg-transparent text-gray-300'
            } ${
              styles.variant === v
                ? 'border-[#217EF2]'
                : v === 4
                  ? 'border-[rgba(255,255,255,0.25)]'
                  : 'border-transparent'
            }`}
            style={{ padding: '8px 14px' }}
          >
            Aa
          </button>
        ))}
      </div>
    </div>
  );
}

function SizeSection({
  sizes,
  value,
  onChange,
}: {
  sizes: TagSize[];
  value: TagSize;
  onChange: (s: TagSize) => void;
}) {
  return (
    <div className="-mx-3 pt-4 border-t px-3" style={sectionBorder}>
      <div className="space-y-2">
        <label
          className="block text-[14px] font-bold text-white text-left"
          style={labelStyle}
        >
          Size
        </label>
        <div className="grid grid-cols-5 gap-1 bg-[#2D2D2D] p-1 rounded-xl">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              className={`py-2 text-xs font-medium rounded-lg transition-all ${
                value === s ? 'bg-[#3D3D3D] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RadiusSection({
  radii,
  value,
  onChange,
}: {
  radii: TagRadius[];
  value: TagRadius;
  onChange: (r: TagRadius) => void;
}) {
  return (
    <div className="-mx-3 pt-4 border-t px-3" style={sectionBorder}>
      <div className="space-y-2">
        <label
          className="block text-[14px] font-bold text-white text-left"
          style={labelStyle}
        >
          Radius
        </label>
        <div className="grid grid-cols-5 gap-1 bg-[#2D2D2D] p-1 rounded-xl">
          {radii.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onChange(r)}
              className={`py-2 text-xs font-medium rounded-lg transition-all ${
                value === r ? 'bg-[#3D3D3D] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlignmentSection({
  alignments,
  value,
  onChange,
}: {
  alignments: TagAlignment[];
  value: TagAlignment;
  onChange: (a: TagAlignment) => void;
}) {
  const icons = {
    left: <AlignLeft size={18} />,
    center: <AlignCenter size={18} />,
    right: <AlignRight size={18} />,
  };

  return (
    <div className="-mx-3 pt-4 border-t px-3" style={sectionBorder}>
      <div className="grid grid-cols-3 gap-2">
        {alignments.map((align) => (
          <button
            key={align}
            type="button"
            onClick={() => onChange(align)}
            className={`flex justify-center py-2.5 rounded-lg transition-all ${
              value === align
                ? 'bg-[#217EF2] text-white'
                : 'bg-[#2D2D2D] text-gray-500 hover:text-gray-300'
            }`}
          >
            {icons[align]}
          </button>
        ))}
      </div>
    </div>
  );
}
