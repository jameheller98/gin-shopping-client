import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import ApiUser from '../../../libs/api/ApiUser';
import dataMenu from '../../../libs/menu/dataMenu.json';
import { openDrawerState } from '../../../state/drawer/drawerAtoms';
import useIsomorphicLayoutEffect from '../../../state/hooks/useIsomorphicLayoutEffect';
import {
  idMenuActiveState,
  menuDataState,
} from '../../../state/menu/menuAtoms';
import { tokenState, userState } from '../../../state/user/UserAtoms';
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
  const [token, setToken] = useRecoilState(tokenState);
  const [user, setUser] = useRecoilState(userState);
  const resetToken = useResetRecoilState(tokenState);

  useIsomorphicLayoutEffect(() => {
    setMenuData(dataMenu);

    const menuActive = dataMenu.find(
      (menu) => menu.href === router.asPath.replace(/\?(.*)/g, '')
    );

    if (menuActive) setIdMenuActive(menuActive.id);
  }, []);

  useEffect(() => {
    const handleUser = async () => {
      try {
        const user = await ApiUser.getUser();

        setUser(user);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            try {
              const tokenRefresh = await ApiUser.refreshToken({
                refreshToken: token.tokenRefresh,
              });

              setToken({
                token: 'Bearer ' + tokenRefresh.token,
                tokenRefresh: tokenRefresh.refreshToken,
              });
            } catch (err) {
              console.log(err);
              resetToken();
            }
          }
        }
      }
    };

    if (token.token) {
      handleUser();
    }
  }, [token.token, token.tokenRefresh, setToken, resetToken, setUser]);

  const handleClickMenu = (menuId: string) => {
    setOpenDrawer(false);
    setIdMenuActive(menuId);
  };

  const handleLogout = async () => {
    try {
      await ApiUser.logout();
    } catch (err) {
      console.log(err);
    } finally {
      resetToken();
      setOpenDrawer(false);
    }
  };

  return (
    <nav {...navProps} className={`mb-14 ${className}`}>
      <Menu arrMenu={dataMenu} />
      <hr className="border-t-2 border-slate-400 my-5 mx-14" />
      <ul className="flex flex-row gap-9 justify-center">
        {token.token ? (
          <li>
            <span className="mr-5 text-base font-medium ">
              {user?.firstName + ' ' + user?.lastName}
            </span>
            <button className="px-2 py-1" onClick={handleLogout}>
              LOG OUT
            </button>
          </li>
        ) : (
          menuLoginLogout.map(({ id, name, href }) => (
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
          ))
        )}
      </ul>
    </nav>
  );
});

export default Navbar;
