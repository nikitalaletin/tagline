import React, { useState, useCallback } from 'react';
import { TagItem } from '../../../types';
import { PanelHeader, FormField } from '../shared';

export interface ItemViewProps {
  item?: TagItem;
  onBack: () => void;
  onClose: () => void;
  onSave: (item: TagItem) => void;
}

export const ItemView: React.FC<ItemViewProps> = ({ item, onBack, onClose, onSave }) => {
  const [label, setLabel] = useState(item?.label ?? '');
  const [link, setLink] = useState(item?.link ?? '');

  const handleSave = useCallback(() => {
    if (!label.trim()) return;
    onSave({
      id: item?.id ?? Math.random().toString(36).slice(2, 11),
      label: label.trim(),
      link: link.trim() || '#',
    });
  }, [item?.id, label, link, onSave]);

  return (
    <div className="flex flex-col h-full">
      <PanelHeader title="Item" onBack={onBack} onClose={onClose} />

      <div className="p-4 space-y-4">
        <FormField
          label="Label"
          value={label}
          onChange={setLabel}
          placeholder="Item name"
          autoFocus
        />
        <FormField
          label="Link"
          value={link}
          onChange={setLink}
          placeholder="https://..."
        />

        <button
          type="button"
          onClick={handleSave}
          className="w-full mt-4 py-3 bg-[#217EF2] hover:bg-[#1C6DD1] text-white rounded-xl font-medium transition-colors"
        >
          {item ? 'Save Changes' : 'Create Item'}
        </button>
      </div>
    </div>
  );
};
