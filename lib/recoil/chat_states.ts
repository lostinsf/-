import { atom } from 'recoil';

// router 클리깃 메뉴 활성화를 위한 인터페이스 및 아톰
interface ChatAtomProps {
  hasChatId: string;
}

export const chatAtom = atom<ChatAtomProps>({
  key: 'chatAtom',
  default: {
    hasChatId: '',
  },
});
