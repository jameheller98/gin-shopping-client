import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import dataMenu from '../../../libs/menu/dataMenu.json';
import { openDrawerState } from '../../../state/drawer/drawerAtoms';
import useIsomorphicLayoutEffect from '../../../state/hooks/useIsomorphicLayoutEffect';
import {
  idMenuActiveState,
  menuDataState,
} from '../../../state/menu/menuAtoms';
import Menu from '../menu/Menu';

export type TNavbar = {} & React.ComponentPropsWithoutRef<'nav'>;

// eslint-disable-next-line react/display-name
const Navbar: React.FC<TNavbar> = memo(({ className, ...navProps }) => {
  const router = useRouter();
  const menuLoginLogout = dataMenu.filter(
    ({ id }) => id === '19' || id === '20'
  );
  const setMenuData = useSetRecoilState(menuDataState);
  const setOpenDrawer = useSetRecoilState(openDrawerState('menuSideBar'));
  const [idMenuActive, setIdMenuActive] = useRecoilState(idMenuActiveState);

  useIsomorphicLayoutEffect(() => {
    setMenuData(dataMenu);

    const menuActive = dataMenu.find(
      (menu) => menu.href === router.asPath.replace(/\?(.*)/g, '')
    );

    if (menuActive) setIdMenuActive(menuActive.id);
  }, []);

  const handleClickMenu = (menuId: string) => {
    setOpenDrawer(false);
    setIdMenuActive(menuId);
  };

  return (
    <nav {...navProps} className={`mb-14 ${className}`}>
      <Menu arrMenu={dataMenu} />
      <hr className="border-t-2 border-slate-400 my-5 mx-14" />
      <ul className="flex flex-row gap-9 justify-center">
        {menuLoginLogout.map(({ id, name, href }) => (
          <li
            key={id}
            className={`py-1 border-2 ${
              idMenuActive === id
                ? 'px-4 border-slate-400 pointer-events-none'
                : 'border-transparent pointer-events-auto'
            }`}
            onClick={() => handleClickMenu(id)}
          >
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Navbar;
