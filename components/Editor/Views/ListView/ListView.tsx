import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { TagItem } from '../../../../types';
import { PanelHeader } from '../../shared';
import { SortableTagItem } from './SortableTagItem';
import { useTagListDnD } from './useTagListDnD';
import { Plus, ChevronRight, Paintbrush } from 'lucide-react';

export interface ListViewProps {
  tags: TagItem[];
  onClose: () => void;
  onAdd: () => void;
  onEdit: (index: number) => void;
  onStyles: () => void;
  onReorder: (from: number, to: number) => void;
  onDelete: (index: number) => void;
}

export const ListView: React.FC<ListViewProps> = ({
  tags,
  onClose,
  onAdd,
  onEdit,
  onStyles,
  onReorder,
  onDelete,
}) => {
  const dnd = useTagListDnD({ tags, onReorder });

  return (
    <div className="flex flex-col h-full view-slide-in">
      <PanelHeader
        title="Tagline"
        variant="center"
        onClose={onClose}
        leftSlot={<div className="w-8" />}
      />

      <div className="flex-1 overflow-y-auto max-h-[350px]">
        <div className="p-2 space-y-1">
          <DndContext
            sensors={dnd.sensors}
            collisionDetection={dnd.collisionDetection}
            onDragEnd={dnd.onDragEnd}
          >
            <SortableContext items={dnd.itemIds} strategy={dnd.strategy}>
              {tags.map((tag, index) => (
                <SortableTagItem
                  key={tag.id}
                  tag={tag}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </SortableContext>
          </DndContext>

          <button
            onClick={onAdd}
            className="w-full flex items-center p-2 rounded-lg hover:bg-[#2D2D2D] text-sm text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
          >
            <Plus size={18} className="mr-2" />
            Add item
          </button>
        </div>
      </div>

      <button
        onClick={onStyles}
        className="flex items-center justify-between p-4 border-t border-[#2D2D2D] hover:bg-[#2D2D2D] transition-colors"
      >
        <div className="flex items-center text-sm font-medium text-white">
          <Paintbrush size={18} className="mr-3 text-gray-400" />
          Styles
        </div>
        <ChevronRight size={18} className="text-gray-600" />
      </button>
    </div>
  );
};
