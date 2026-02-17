
import React, { useState } from 'react';
import { TagItem } from '../../../types';
import { X, ChevronLeft } from 'lucide-react';

interface Props {
  item?: TagItem;
  onBack: () => void;
  onClose: () => void;
  onSave: (item: TagItem) => void;
}

export const ItemView: React.FC<Props> = ({ item, onBack, onClose, onSave }) => {
  const [label, setLabel] = useState(item?.label || '');
  const [link, setLink] = useState(item?.link || '');

  const handleSave = () => {
    if (!label.trim()) return;
    onSave({
      id: item?.id || Math.random().toString(36).substr(2, 9),
      label,
      link: link || '#'
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-[#2D2D2D]">
        <button onClick={onBack} className="p-1 hover:bg-[#2D2D2D] rounded-lg text-gray-400">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold text-white">Item</h2>
        <button onClick={onClose} className="p-1 hover:bg-[#2D2D2D] rounded-lg text-gray-400">
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div
          className="flex flex-col w-full rounded-md border focus-within:border-[#217EF2] transition-colors text-left gap-1"
          style={{
            height: '47px',
            padding: '7px 12px 8px 12px',
            background: 'rgba(255, 255, 255, 0.07)',
            borderColor: 'rgba(233, 236, 246, 0.07)',
          }}
        >
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider text-left leading-tight shrink-0">Label</label>
          <input
            autoFocus
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-sm text-left font-medium"
            style={{ fontFamily: 'Onest, sans-serif', lineHeight: '16px' }}
            placeholder="Item name"
          />
        </div>

        <div
          className="flex flex-col w-full rounded-md border focus-within:border-[#217EF2] transition-colors text-left gap-1"
          style={{
            height: '47px',
            padding: '7px 12px 8px 12px',
            background: 'rgba(255, 255, 255, 0.07)',
            borderColor: 'rgba(233, 236, 246, 0.07)',
          }}
        >
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider text-left leading-tight shrink-0">Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-sm text-left font-medium"
            style={{ fontFamily: 'Onest, sans-serif', lineHeight: '16px' }}
            placeholder="https://..."
          />
        </div>

        <button 
          onClick={handleSave}
          className="w-full mt-4 py-3 bg-[#217EF2] hover:bg-[#1C6DD1] text-white rounded-xl font-medium transition-colors"
        >
          {item ? 'Save Changes' : 'Create Item'}
        </button>
      </div>
    </div>
  );
};
