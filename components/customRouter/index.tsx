import { memo, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { useRecoilState } from 'recoil';
import { menuAtom } from '@lib/recoil';
import { CurstomRouterWrapper } from './styles';

function CustomRouter(): JSX.Element {
  const [menuState, setMenuState] = useRecoilState(menuAtom);

  const onCustomRouterClick = useCallback((): void => {
    setMenuState({ isOpen: !menuState.isOpen });
  }, [menuState.isOpen]);

  return (
    <CurstomRouterWrapper isOpen={menuState.isOpen} onClick={onCustomRouterClick}>
      <span />
      {!menuState.isOpen && <p>Menu</p>}
    </CurstomRouterWrapper>
  );
}

export default memo(CustomRouter, IsEqual);
