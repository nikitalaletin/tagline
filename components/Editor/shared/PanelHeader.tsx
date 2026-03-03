import React from 'react';
import { X, ChevronLeft } from 'lucide-react';

export type PanelHeaderVariant = 'center' | 'withBack';

interface PanelHeaderProps {
  title: string;
  variant?: PanelHeaderVariant;
  compact?: boolean;
  onBack?: () => void;
  onClose: () => void;
  leftSlot?: React.ReactNode;
}

const styles = {
  root: 'flex items-center justify-between border-b border-[#2D2D2D]',
  defaultPadding: 'p-4',
  compactPadding: 'px-3 py-2.5',
  title: 'text-lg font-semibold text-white',
  iconButton: 'p-1 hover:bg-[#2D2D2D] rounded-lg text-gray-400',
};

export const PanelHeader: React.FC<PanelHeaderProps> = ({
  title,
  variant = 'withBack',
  compact,
  onBack,
  onClose,
  leftSlot,
}) => {
  const left = leftSlot ?? (
    variant === 'withBack' && onBack ? (
      <button type="button" onClick={onBack} className={styles.iconButton} aria-label="Back">
        <ChevronLeft size={20} />
      </button>
    ) : (
      <div className="w-8" />
    )
  );

  const padding = compact ? styles.compactPadding : styles.defaultPadding;

  return (
    <div className={`${styles.root} ${padding}`}>
      {left}
      <h2 className={styles.title}>{title}</h2>
      <button type="button" onClick={onClose} className={styles.iconButton} aria-label="Close">
        <X size={20} />
      </button>
    </div>
  );
};
