import { atom } from 'recoil';

interface MenuAtomProps {
  isOpen: boolean;
}

export const menuAtom = atom<MenuAtomProps>({
  key: 'menuAtom',
  default: {
    isOpen: false,
  },
});
