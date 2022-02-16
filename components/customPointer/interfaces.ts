export interface CursorPosition {
  x: number;
  y: number;
}
export const initCursorPosition: CursorPosition = {
  x: 0,
  y: 0,
};

export interface CursorScale {
  dotScale: number;
  ringScale: number;
}
export const initCursorScale: CursorScale = {
  dotScale: 1,
  ringScale: 1,
};
export const activeCursorScale: CursorScale = {
  dotScale: 0.6,
  ringScale: 1.4,
};
export const clickCursorScale: CursorScale = {
  dotScale: 0.8,
  ringScale: 1.6,
};

export const clickableTags = 'a, input[type="submit"], input[type="image"], label[for], select, button, .link';
