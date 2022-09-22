import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import ApiUser from '../../../libs/api/ApiUser';
import dataMenu from '../../../libs/menu/dataMenu.json';
import { openDrawerState } from '../../../state/drawer/drawerAtoms';
import useIsomorphicLayoutEffect from '../../../state/hooks/useIsomorphicLayoutEffect';
import {
  idMenuActiveState,
  menuDataState,
} from '../../../state/menu/menuAtoms';
import { tokenState, userState } from '../../../state/user/UserAtoms';
import Spinner from '../../common/spinner/Spinner';
import Username from '../../common/username/Username';
import Menu from '../menu/Menu';

export type TNavbar = {} & React.ComponentPropsWithoutRef<'nav'>;

// eslint-disable-next-line react/display-name
const Navbar: React.FC<TNavbar> = memo(({ className, ...navProps }) => {
  const router = useRouter();
  const menuLoginLogout = dataMenu.filter(
    ({ id }) => id === '19' || id === '20'
  );
  const setMenuData = useSetRecoilState(menuDataState);
  const [idMenuActive, setIdMenuActive] = useRecoilState(idMenuActiveState);
  const setOpenDrawer = useSetRecoilState(openDrawerState('menuSideBar'));
  const token = useRecoilValue(tokenState);
  const resetToken = useResetRecoilState(tokenState);
  const resetUser = useResetRecoilState(userState);

  useIsomorphicLayoutEffect(() => {
    setMenuData(dataMenu);

    const menuActive = dataMenu.find(
      (menu) => menu.href === router.asPath.replace(/\?(.*)/g, '')
    );

    if (menuActive) setIdMenuActive(menuActive.id);
  }, [router]);

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
      resetUser();
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
            <ErrorBoundary
              FallbackComponent={() => <span>Gin</span>}
              onError={() => {
                resetToken();
                resetUser();
              }}
            >
              <Suspense fallback={<Spinner />}>
                <Username />
              </Suspense>
            </ErrorBoundary>
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
