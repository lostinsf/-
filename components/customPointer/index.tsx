import { memo, useCallback, useEffect, useState, useRef } from 'react';
import IsEqual from 'react-fast-compare';
import { isMobileDevice } from '@lib/helpers';
import { useEventListener } from '@lib/hooks';
import {
  activeCursorScale,
  clickCursorScale,
  clickableTags,
  initCursorPosition,
  initCursorScale,
  CursorPosition,
  CursorScale,
} from './interfaces';
import { CursorDot, CursorRing } from './styles';

type CustomPoinerProps = {
  dotSize?: number;
  ringSize?: number;
  color?: string;
  mixBlend?: boolean;
  transitionTime?: number;
};

function CustomPoiner(props: CustomPoinerProps): JSX.Element | null {
  const { color, dotSize, mixBlend, ringSize, transitionTime } = props;
  const [cursor, setCursor] = useState<CursorPosition>(initCursorPosition);
  const [scale, setScale] = useState<CursorScale>(initCursorScale);

  const resetCursorScale = useCallback((): void => {
    setScale(initCursorScale);
  }, []);

  const activateCursor = useCallback((): void => {
    setScale(activeCursorScale);
  }, []);

  const clickableCursor = useCallback((): void => {
    setScale(clickCursorScale);
  }, []);

  const onMouseMove = useCallback(({ clientX, clientY }): void => {
    setCursor({ x: clientX, y: clientY });
  }, []);

  const onMouseDown = useCallback(() => {
    activateCursor();
  }, []);

  const onMouseUp = useCallback(() => {
    resetCursorScale();
  }, []);

  useEventListener('mousemove', onMouseMove);
  useEventListener('mousedown', onMouseDown);
  useEventListener('mouseup', onMouseUp);

  useEffect(() => {
    const clickables = document.querySelectorAll(clickableTags);
    clickables.forEach((el) => {
      /* eslint-disable no-param-reassign */
      // @ts-ignore
      el.style.cursor = 'none';
      /* eslint-enable */

      el.addEventListener('click', clickableCursor);
      el.addEventListener('mousedown', clickableCursor);
      el.addEventListener('mouseup', resetCursorScale);
      el.addEventListener('mouseover', clickableCursor);
      el.addEventListener('mouseout', resetCursorScale);
    });

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener('click', clickableCursor);
        el.removeEventListener('mousedown', clickableCursor);
        el.removeEventListener('mouseup', resetCursorScale);
        el.removeEventListener('mouseover', clickableCursor);
        el.removeEventListener('mouseout', resetCursorScale);
      });
    };
  }, []);

  if (isMobileDevice()) {
    return null;
  }
  return (
    <>
      <CursorDot
        $color={color!}
        $mixBlend={mixBlend!}
        $dotSize={dotSize!}
        $x={cursor.x}
        $y={cursor.y}
        $scale={scale.dotScale}
      />
      <CursorRing
        $color={color!}
        $mixBlend={mixBlend!}
        $transitionTime={transitionTime!}
        $dotSize={dotSize!}
        $ringSize={ringSize!}
        $x={cursor.x}
        $y={cursor.y}
        $scale={scale.ringScale}
      />
    </>
  );
}

CustomPoiner.defaultProps = {
  dotSize: 8,
  ringSize: 32,
  color: '#3159df',
  mixBlend: false,
  transitionTime: 150,
} as CustomPoinerProps;

export default memo(CustomPoiner, IsEqual);
