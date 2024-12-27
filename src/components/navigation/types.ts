import { ReactNode } from 'react';

export interface SubItem {
  label: string;
  icon: ReactNode;
  subitems?: string[];
}

export interface MenuItem {
  icon: ReactNode;
  label: string;
  items: SubItem[];
}

export interface MenuItems {
  [key: string]: MenuItem;
}