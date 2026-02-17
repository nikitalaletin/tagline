import { makeAutoObservable, reaction } from 'mobx';
import type { TagItem, TaglineStyles } from '../types';

const INITIAL_STYLES: TaglineStyles = {
  variant: 1,
  size: 'M',
  radius: '8',
  alignment: 'center',
};

export class TaglineStore {
  tags: TagItem[] = [];
  styles: TaglineStyles = INITIAL_STYLES;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => ({ tags: this.tags, styles: this.styles }),
      (data) => {
        console.log('POST http://api/tagline', data);
      }
    );
  }

  setTags = (tags: TagItem[]) => {
    this.tags = tags;
  };

  setStyles = (styles: TaglineStyles) => {
    this.styles = styles;
  };

  addTag = (tag: TagItem) => {
    this.tags = [...this.tags, tag];
  };

  removeTag = (index: number) => {
    this.tags = this.tags.filter((_, i) => i !== index);
  };

  updateTag = (index: number, tag: TagItem) => {
    const newTags = [...this.tags];
    newTags[index] = tag;
    this.tags = newTags;
  };

  reorderTags = (from: number, to: number) => {
    const newTags = [...this.tags];
    const [removed] = newTags.splice(from, 1);
    newTags.splice(to, 0, removed);
    this.tags = newTags;
  };

  get data() {
    return { tags: this.tags, styles: this.styles };
  }
}

export const taglineStore = new TaglineStore();
