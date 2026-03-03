import React from 'react';
import { observer } from 'mobx-react-lite';
import { useEditorPanel } from '../../hooks/useEditorPanel';
import { ListView } from './Views/ListView';
import { ItemView } from './Views/ItemView';
import { StylesView } from './Views/StylesView';

interface EditorPanelProps {
  onClose: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = observer(({ onClose }) => {
  const {
    view,
    tags,
    styles,
    editingItem,
    setStyles,
    handlers,
  } = useEditorPanel({ onClose });

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 w-[340px] bg-[#1E1E1E] rounded-xl border border-[#2D2D2D] shadow-2xl overflow-hidden">
      <div className="relative">
        {view === 'main' && (
          <ListView
            tags={tags}
            onClose={onClose}
            onAdd={handlers.onAdd}
            onEdit={handlers.onEdit}
            onStyles={handlers.onOpenStyles}
            onReorder={handlers.onReorder}
            onDelete={handlers.onRemoveItem}
          />
        )}

        {(view === 'create' || view === 'edit') && (
          <div className="view-slide-in">
            <ItemView
              item={editingItem}
              onBack={handlers.onBack}
              onClose={onClose}
              onSave={handlers.onSaveItem}
            />
          </div>
        )}

        {view === 'styles' && (
          <div className="view-slide-in">
            <StylesView
              styles={styles}
              onBack={handlers.onBack}
              onClose={onClose}
              onUpdate={setStyles}
            />
          </div>
        )}
      </div>
    </div>
  );
});
