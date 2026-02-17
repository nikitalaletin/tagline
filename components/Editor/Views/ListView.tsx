import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TagItem } from '../../../types';
import { X, Plus, ChevronRight, Paintbrush, Trash2, GripVertical } from 'lucide-react';

interface SortableTagItemProps {
  tag: TagItem;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const SortableTagItem: React.FC<SortableTagItemProps> = ({ tag, index, onEdit, onDelete }) => {
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
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

interface Props {
  tags: TagItem[];
  onClose: () => void;
  onAdd: () => void;
  onEdit: (index: number) => void;
  onStyles: () => void;
  onReorder: (from: number, to: number) => void;
  onDelete: (index: number) => void;
}

export const ListView: React.FC<Props> = ({ tags, onClose, onAdd, onEdit, onStyles, onReorder, onDelete }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tags.findIndex((t) => t.id === active.id);
    const newIndex = tags.findIndex((t) => t.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      onReorder(oldIndex, newIndex);
    }
  };

  return (
    <div className="flex flex-col h-full view-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#2D2D2D]">
        <div className="w-8" /> {/* Spacer */}
        <h2 className="text-lg font-semibold text-white">Tagline</h2>
        <button onClick={onClose} className="p-1 hover:bg-[#2D2D2D] rounded-lg text-gray-400">
          <X size={20} />
        </button>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto max-h-[350px]">
        <div className="p-2 space-y-1">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={tags.map((t) => t.id)} strategy={verticalListSortingStrategy}>
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

      {/* Footer Nav */}
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
