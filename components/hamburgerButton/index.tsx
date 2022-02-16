import { memo, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { useRecoilState } from 'recoil';
import { menuAtom } from '@lib/recoil';
import { HamburgerWrapper } from './styles';

function HamburgerButton(): JSX.Element {
  const [menuState, setMenuState] = useRecoilState(menuAtom);

  const onHamburgerClick = useCallback((): void => {
    setMenuState({ isHamburgerOpen: !menuState.isHamburgerOpen });
  }, [menuState.isHamburgerOpen]);

  return (
    <HamburgerWrapper isOpen={menuState.isHamburgerOpen} onClick={onHamburgerClick}>
      <span />
      {!menuState.isHamburgerOpen && <p>Menu</p>}
    </HamburgerWrapper>
  );
}

export default memo(HamburgerButton, IsEqual);
