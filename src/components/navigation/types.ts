import { ReactNode } from 'react';

export interface SubMenuItem {
  label: string;
  icon?: ReactNode;
  subitems?: string[];
  link?: string;
  links?: Record<string, string>;
}

export interface MenuItem {
  icon: ReactNode;
  label: string;
  items: SubMenuItem[];
}

export interface MenuItems {
  [key: string]: MenuItem;
}