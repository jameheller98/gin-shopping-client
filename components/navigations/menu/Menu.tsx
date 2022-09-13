import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, MouseEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { openDrawerState } from '../../../state/drawer/drawerAtoms';
import useIsomorphicLayoutEffect from '../../../state/hooks/useIsomorphicLayoutEffect';
import {
  arrIdMenuOpenState,
  idMenuActiveState,
} from '../../../state/menu/menuAtoms';
import { findArrObjMenuActive } from '../../../utils/menu/menuHelper';
import { mockMenuProps } from './Menu.mocks';

export interface IMenuObject {
  id: string;
  name: string;
  href: string;
  tagParam: string;
  bgColorChild: string;
  children: IMenuObject[];
}

export type TMenu = {
  arrMenu: IMenuObject[];
} & React.ComponentPropsWithoutRef<'ul'>;

// eslint-disable-next-line react/display-name
const Menu: React.FC<TMenu> = memo(({ arrMenu, className, ...ulProps }) => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useRecoilState(
    openDrawerState('menuSideBar')
  );

  const [idMenuActive, setIdMenuActive] = useRecoilState(idMenuActiveState);
  const [arrIdMenuOpen, setArrIdMenuOpen] = useRecoilState(arrIdMenuOpenState);
  const transitionTextClass = classNames({
    'opacity-100 translate-x-0': openDrawer,
    'opacity-0 -translate-x-4': !openDrawer,
  });

  useIsomorphicLayoutEffect(() => {
    const idMenuActiveQuery = findArrObjMenuActive(
      mockMenuProps.base.arrMenu,
      router.asPath.split('/').filter((path) => Boolean(path)),
      'id'
    ) as string[];
    const menuActive = arrMenu.find(
      (menu) => menu.href === router.asPath.replace(/\?(.*)/g, '')
    );

    if (menuActive) setIdMenuActive(menuActive.id);

    if (router.query.productId) setIdMenuActive('0');

    setArrIdMenuOpen(idMenuActiveQuery.slice(0, idMenuActiveQuery.length - 1));
  }, [arrMenu, router, setIdMenuActive, setArrIdMenuOpen]);

  const handleClickItem = (
    event: MouseEvent<HTMLSpanElement>,
    idMenu: string,
    hasLink: boolean
  ) => {
    event.stopPropagation();
    if (hasLink) setIdMenuActive(idMenu);
    setOpenDrawer(false);
  };

  const handleToggleMenuItems = useCallback(
    (idMenu: IMenuObject['id']) => {
      if (arrIdMenuOpen.includes(idMenu)) {
        setArrIdMenuOpen(
          arrIdMenuOpen.filter((idMenuItem) => idMenuItem !== idMenu)
        );
      } else {
        setArrIdMenuOpen(arrIdMenuOpen.concat(idMenu));
      }
    },
    [arrIdMenuOpen, setArrIdMenuOpen]
  );

  const handleActiveMenuItem = (idMenu: string) => {
    const activeParentMenuItemClass = classNames({
      'before:scale-y-1': idMenuActive === idMenu,
      'before:scale-y-0': idMenuActive !== idMenu,
    });

    return `before:absolute before:top-0 before:w-[2px] before:bg-slate-600 before:h-6 ${activeParentMenuItemClass}`;
  };

  return (
    <ul {...ulProps} className={`flex flex-col gap-5 relative ${className}`}>
      {arrMenu.map(({ id, name, href, bgColorChild, children }, index) => {
        const delaySequenceClass = classNames({
          'delay-[300ms]': index === 0 || index === 4,
          'delay-[400ms]': index === 1 || index === 3,
          'delay-[500ms]': index === 2,
        });
        const LinkHref = (hasLink: boolean, href: string) => (
          <a
            href={href}
            className={`pl-2 ${
              idMenuActive !== id
                ? 'pointer-events-auto'
                : 'pointer-events-none'
            }`}
            onClick={(e) => {
              if (idMenuActive !== id) handleClickItem(e, id, hasLink);
            }}
          >
            {name}
          </a>
        );

        return (
          <li
            key={name}
            className={`w-full transition duration-200 ${handleActiveMenuItem(
              id
            )} ${delaySequenceClass} ${transitionTextClass}`}
          >
            {href.search(/#/g) >= 0 ? (
              LinkHref(false, '#')
            ) : (
              <Link href={href}>{LinkHref(true, href)}</Link>
            )}
            {children.length > 0 &&
              (arrIdMenuOpen.includes(id) ? (
                <MinusSmIcon
                  className="h-7 w-7 ml-1 inline cursor-pointer"
                  onClick={() => handleToggleMenuItems(id)}
                />
              ) : (
                <PlusSmIcon
                  className="h-7 w-7 ml-1 inline cursor-pointer"
                  onClick={() => handleToggleMenuItems(id)}
                />
              ))}
            {children.length > 0 && (
              <div
                className={`overflow-hidden ${
                  arrIdMenuOpen.includes(id)
                    ? 'animate-trans-sub-menu-in'
                    : 'animate-trans-sub-menu-out'
                }`}
              >
                <Menu
                  className={`ml-5 mt-5 p-5 ${bgColorChild}`}
                  arrMenu={children}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
});

export default Menu;
