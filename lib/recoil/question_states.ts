import { atom } from 'recoil';

interface QuestionAtom {
  answerFirst?: string;
  answerSecond?: string;
}

export const questionAtom = atom<QuestionAtom>({
  key: 'questionAtom',
  default: {},
});
