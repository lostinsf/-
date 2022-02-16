import { atom } from 'recoil';

interface MenuAtomProps {
  isHamburgerOpen: boolean;
}

export const menuAtom = atom<MenuAtomProps>({
  key: 'menuAtom',
  default: {
    isHamburgerOpen: false,
  },
});
