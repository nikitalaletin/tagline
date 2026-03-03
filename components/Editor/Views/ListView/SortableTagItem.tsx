import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TagItem } from '../../../../types';
import { Trash2, GripVertical } from 'lucide-react';

export interface SortableTagItemProps {
  tag: TagItem;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export const SortableTagItem: React.FC<SortableTagItemProps> = ({
  tag,
  index,
  onEdit,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tag.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center justify-between p-2 rounded-lg hover:bg-[#2D2D2D] transition-colors cursor-pointer ${
        isDragging ? 'bg-[#2D2D2D] opacity-80 z-10 shadow-lg' : ''
      }`}
      onClick={() => onEdit(index)}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="p-1 -ml-1 hover:bg-[#3D3D3D] rounded cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-400 touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical size={16} />
        </button>
        <span className="text-sm text-gray-200 truncate">{tag.label}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(index);
        }}
        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-gray-500 transition-opacity shrink-0"
        aria-label="Delete"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};
