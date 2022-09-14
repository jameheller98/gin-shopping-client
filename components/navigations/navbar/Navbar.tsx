import { memo } from 'react';
import { useSetRecoilState } from 'recoil';
import dataMenu from '../../../libs/menu/dataMenu.json';
import useIsomorphicLayoutEffect from '../../../state/hooks/useIsomorphicLayoutEffect';
import { menuDataState } from '../../../state/menu/menuAtoms';
import Menu from '../menu/Menu';

export type TNavbar = {} & React.ComponentPropsWithoutRef<'nav'>;

// eslint-disable-next-line react/display-name
const Navbar: React.FC<TNavbar> = memo(({ className, ...navProps }) => {
  const setMenuData = useSetRecoilState(menuDataState);

  useIsomorphicLayoutEffect(() => {
    setMenuData(dataMenu);
  }, []);

  return (
    <nav {...navProps} className={`mb-14 ${className}`}>
      <Menu arrMenu={dataMenu} />
    </nav>
  );
});

export default Navbar;
