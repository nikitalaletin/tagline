import { useState, useCallback } from 'react';
import type { EditorView, TagItem } from '../types';
import { taglineStore } from '../stores/taglineStore';

export interface UseEditorPanelOptions {
  onClose: () => void;
}

export interface EditorPanelHandlers {
  onAdd: () => void;
  onEdit: (index: number) => void;
  onBack: () => void;
  onSaveItem: (item: TagItem) => void;
  onRemoveItem: (index: number) => void;
  onReorder: (from: number, to: number) => void;
  onOpenStyles: () => void;
}

export function useEditorPanel({ onClose }: UseEditorPanelOptions) {
  const [view, setView] = useState<EditorView>('main');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAdd = useCallback(() => setView('create'), []);
  const handleEdit = useCallback((index: number) => {
    setEditingIndex(index);
    setView('edit');
  }, []);
  const handleBack = useCallback(() => {
    setView('main');
    setEditingIndex(null);
  }, []);

  const handleSaveItem = useCallback((item: TagItem) => {
    if (view === 'create') {
      taglineStore.addTag(item);
    } else if (view === 'edit' && editingIndex !== null) {
      taglineStore.updateTag(editingIndex, item);
    }
    setView('main');
    setEditingIndex(null);
  }, [view, editingIndex]);

  const handleRemoveItem = useCallback((index: number) => {
    taglineStore.removeTag(index);
  }, []);

  const handleReorder = useCallback((from: number, to: number) => {
    taglineStore.reorderTags(from, to);
  }, []);

  const handleOpenStyles = useCallback(() => setView('styles'), []);

  const handlers: EditorPanelHandlers = {
    onAdd: handleAdd,
    onEdit: handleEdit,
    onBack: handleBack,
    onSaveItem: handleSaveItem,
    onRemoveItem: handleRemoveItem,
    onReorder: handleReorder,
    onOpenStyles: handleOpenStyles,
  };

  const editingItem = view === 'edit' && editingIndex !== null
    ? taglineStore.tags[editingIndex]
    : undefined;

  return {
    view,
    tags: taglineStore.tags,
    styles: taglineStore.styles,
    editingItem,
    setStyles: taglineStore.setStyles,
    onClose,
    handlers,
  };
}
