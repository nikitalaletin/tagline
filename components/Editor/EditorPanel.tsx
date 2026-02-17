import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { EditorView, TagItem } from '../../types';
import { taglineStore } from '../../stores/taglineStore';
import { ListView } from './Views/ListView';
import { ItemView } from './Views/ItemView';
import { StylesView } from './Views/StylesView';

interface Props {
  onClose: () => void;
}

export const EditorPanel: React.FC<Props> = observer(({ onClose }) => {
  const [view, setView] = useState<EditorView>('main');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddClick = () => setView('create');

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setView('edit');
  };

  const handleBack = () => {
    setView('main');
    setEditingIndex(null);
  };

  const handleSaveItem = (item: TagItem) => {
    if (view === 'create') {
      taglineStore.addTag(item);
    } else if (view === 'edit' && editingIndex !== null) {
      taglineStore.updateTag(editingIndex, item);
    }
    handleBack();
  };

  const handleRemoveItem = (index: number) => {
    taglineStore.removeTag(index);
  };

  const handleReorder = (from: number, to: number) => {
    taglineStore.reorderTags(from, to);
  };

  const { tags, styles } = taglineStore;

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 w-[340px] bg-[#1E1E1E] rounded-xl border border-[#2D2D2D] shadow-2xl overflow-hidden">
      <div className="relative">
        {view === 'main' && (
          <ListView
            tags={tags}
            onClose={onClose}
            onAdd={handleAddClick}
            onEdit={handleEditClick}
            onStyles={() => setView('styles')}
            onReorder={handleReorder}
            onDelete={handleRemoveItem}
          />
        )}

        {(view === 'create' || view === 'edit') && (
          <div className="view-slide-in">
          <ItemView
            item={view === 'edit' && editingIndex !== null ? tags[editingIndex] : undefined}
            onBack={handleBack}
            onClose={onClose}
            onSave={handleSaveItem}
          />
          </div>
        )}

        {view === 'styles' && (
          <div className="view-slide-in">
          <StylesView
            styles={styles}
            onBack={handleBack}
            onClose={onClose}
            onUpdate={taglineStore.setStyles}
          />
          </div>
        )}
      </div>
    </div>
  );
});
