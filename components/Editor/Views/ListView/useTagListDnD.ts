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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useMemo } from 'react';
import type { TagItem } from '../../../../types';

export interface UseTagListDnDOptions {
  tags: TagItem[];
  onReorder: (from: number, to: number) => void;
}

export function useTagListDnD({ tags, onReorder }: UseTagListDnDOptions) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
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

  const itemIds = useMemo(() => tags.map((t) => t.id), [tags]);

  return {
    sensors,
    collisionDetection: closestCenter,
    onDragEnd: handleDragEnd,
    itemIds,
    strategy: verticalListSortingStrategy,
  };
}
