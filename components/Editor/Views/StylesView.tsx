
import React from 'react';
import { TaglineStyles, TagSize, TagRadius, TagAlignment, TagVariant } from '../../../types';
import { X, ChevronLeft, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface Props {
  styles: TaglineStyles;
  onBack: () => void;
  onClose: () => void;
  onUpdate: (styles: TaglineStyles) => void;
}

export const StylesView: React.FC<Props> = ({ styles, onBack, onClose, onUpdate }) => {
  const update = <K extends keyof TaglineStyles>(key: K, value: TaglineStyles[K]) => {
    onUpdate({ ...styles, [key]: value });
  };

  const SIZES: TagSize[] = ['XL', 'L', 'M', 'S', 'XS'];
  const RADII: TagRadius[] = ['0', '4', '8', '12', '100'];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#2D2D2D]">
        <button onClick={onBack} className="p-1 hover:bg-[#2D2D2D] rounded-lg text-gray-400">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold text-white">Styles</h2>
        <button onClick={onClose} className="p-1 hover:bg-[#2D2D2D] rounded-lg text-gray-400">
          <X size={20} />
        </button>
      </div>

      <div className="p-3 overflow-y-auto text-left flex flex-col gap-4">
        {/* Style Variant */}
        <div className="space-y-2">
          <label className="block text-[14px] font-bold text-white text-left" style={{ fontFamily: 'Onest, sans-serif', lineHeight: '140%' }}>Style</label>
          <div className="flex gap-[10px]">
            {[1, 2, 3, 4].map((v) => (
              <button
                key={v}
                onClick={() => update('variant', v as TagVariant)}
                className={`flex-1 h-[37px] rounded-[6px] flex items-center justify-center text-[10px] font-bold border-2 box-border ${v === 1 ? 'bg-[rgba(255,255,255,0.1)] text-white' :
                  v === 2 ? 'bg-[rgba(21,123,218,0.2)] text-[#7DBEF5]' :
                    v === 3 ? 'bg-[rgba(21,123,218,0.93)] text-white' :
                      'bg-transparent text-gray-300'
                  } ${styles.variant === v
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

        {/* Size Selection */}
        <div className="-mx-3 pt-4 border-t px-3" style={{ borderColor: 'rgba(233, 236, 246, 0.07)' }}>
          <div className="space-y-2">
          <label className="block text-[14px] font-bold text-white text-left" style={{ fontFamily: 'Onest, sans-serif', lineHeight: '140%' }}>Size</label>
          <div className="grid grid-cols-5 gap-1 bg-[#2D2D2D] p-1 rounded-xl">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => update('size', s)}
                className={`py-2 text-xs font-medium rounded-lg transition-all ${styles.size === s ? 'bg-[#3D3D3D] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
          </div>
        </div>

        {/* Radius Selection */}
        <div className="-mx-3 pt-4 border-t px-3" style={{ borderColor: 'rgba(233, 236, 246, 0.07)' }}>
          <div className="space-y-2">
          <label className="block text-[14px] font-bold text-white text-left" style={{ fontFamily: 'Onest, sans-serif', lineHeight: '140%' }}>Radius</label>
          <div className="grid grid-cols-5 gap-1 bg-[#2D2D2D] p-1 rounded-xl">
            {RADII.map((r) => (
              <button
                key={r}
                onClick={() => update('radius', r)}
                className={`py-2 text-xs font-medium rounded-lg transition-all ${styles.radius === r ? 'bg-[#3D3D3D] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
          </div>
        </div>

        {/* Alignment */}
        <div className="-mx-3 pt-4 border-t px-3" style={{ borderColor: 'rgba(233, 236, 246, 0.07)' }}>
          <div className="grid grid-cols-3 gap-2">
          {(['left', 'center', 'right'] as TagAlignment[]).map((align) => (
            <button
              key={align}
              onClick={() => update('alignment', align)}
              className={`flex justify-center py-2.5 rounded-lg transition-all ${styles.alignment === align ? 'bg-[#217EF2] text-white' : 'bg-[#2D2D2D] text-gray-500 hover:text-gray-300'
                }`}
            >
              {align === 'left' && <AlignLeft size={18} />}
              {align === 'center' && <AlignCenter size={18} />}
              {align === 'right' && <AlignRight size={18} />}
            </button>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};
