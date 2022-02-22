import { atom } from 'recoil';

// router 클리깃 메뉴 활성화를 위한 인터페이스 및 아톰
interface MenuAtomProps {
  isOpen: boolean;
}

export const menuAtom = atom<MenuAtomProps>({
  key: 'menuAtom',
  default: {
    isOpen: false,
  },
});
