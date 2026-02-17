
export type TagSize = 'XL' | 'L' | 'M' | 'S' | 'XS';
export type TagRadius = '0' | '4' | '8' | '12' | '100';
export type TagAlignment = 'left' | 'center' | 'right';
export type TagVariant = 1 | 2 | 3 | 4;

export interface TagItem {
  id: string;
  label: string;
  link: string;
}

export interface TaglineStyles {
  variant: TagVariant;
  size: TagSize;
  radius: TagRadius;
  alignment: TagAlignment;
}

export interface TaglineData {
  tags: TagItem[];
  styles: TaglineStyles;
}

export type EditorView = 'main' | 'create' | 'edit' | 'styles';
