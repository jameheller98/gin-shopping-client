import {
  ChevronDownIcon,
  ChevronRightIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, MouseEvent, useCallback, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IMenuData } from '../../../libs/menu/interfaces';
import { openDrawerState } from '../../../state/drawer/drawerAtoms';
import useIsomorphicLayoutEffect from '../../../state/hooks/useIsomorphicLayoutEffect';
import useWindowSize from '../../../state/hooks/useWindowSize';
import {
  arrIdMenuOpenState,
  idMenuActiveState,
  menuDataState,
} from '../../../state/menu/menuAtoms';
import { findArrObjMenuActive } from '../../../utils/menu/menuHelper';

export type TMenu = {
  arrMenu: IMenuData[];
  isParent?: boolean;
  excludeMenu?: IMenuData['id'][];
} & React.ComponentPropsWithoutRef<'ul'>;

// eslint-disable-next-line react/display-name
const Menu: React.FC<TMenu> = memo(
  ({
    arrMenu,
    isParent = true,
    excludeMenu = ['19', '20'],
    className,
    ...ulProps
  }) => {
    const arrMenuFilterExclude = useRef(
      arrMenu.filter((menu) => !excludeMenu.includes(menu.id))
    );
    const router = useRouter();
    const [openDrawer, setOpenDrawer] = useRecoilState(
      openDrawerState('menuSideBar')
    );
    const [idMenuActive, setIdMenuActive] = useRecoilState(idMenuActiveState);
    const [arrIdMenuOpen, setArrIdMenuOpen] =
      useRecoilState(arrIdMenuOpenState);
    const menuData = useRecoilValue(menuDataState);
    const transitionTextClass = classNames({
      'opacity-100 translate-x-0': openDrawer,
      'opacity-0 -translate-x-4': !openDrawer,
    });
    const { width } = useWindowSize();

    useIsomorphicLayoutEffect(() => {
      if (width < 1200) {
        const idsMenuActiveQuery = findArrObjMenuActive(
          menuData,
          router.asPath.split('/').filter((path) => Boolean(path)),
          'id'
        ) as string[];
        const menuActive = arrMenuFilterExclude.current.find(
          (menu) => menu.href === router.asPath.replace(/\?(.*)/g, '')
        );

        if (menuActive) setIdMenuActive(menuActive.id);

        if (router.query.productId) setIdMenuActive('0');

        setArrIdMenuOpen(
          idsMenuActiveQuery.slice(0, idsMenuActiveQuery.length - 1)
        );
      }
    }, [width, menuData, router, setIdMenuActive, setArrIdMenuOpen]);

    const handleClickItem = (
      event: MouseEvent<HTMLSpanElement>,
      idMenu: string,
      hasLink: boolean
    ) => {
      event.stopPropagation();
      if (hasLink) setIdMenuActive(idMenu);
      width < 1200 && setOpenDrawer(false);
    };

    const handleToggleMenuItems = useCallback(
      (idMenu: IMenuData['id']) => {
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

    const handleHoverMenuItems = useCallback(
      (idMenu: IMenuData['id']) =>
        setArrIdMenuOpen((arrIdMenuOpen) =>
          !arrIdMenuOpen.includes(idMenu)
            ? arrIdMenuOpen.concat(idMenu)
            : arrIdMenuOpen
        ),
      [setArrIdMenuOpen]
    );

    const handleLeaveMenuItems = useCallback(
      (idMenu: IMenuData['id']) =>
        setArrIdMenuOpen((arrIdMenuOpen) =>
          arrIdMenuOpen.filter((idMenuItem) => idMenuItem !== idMenu)
        ),
      [setArrIdMenuOpen]
    );

    const handleActiveMenuItem = (idMenu: string) => {
      const activeParentMenuItemClass = classNames({
        'before:scale-y-1': idMenuActive === idMenu,
        'before:scale-y-0': idMenuActive !== idMenu,
      });

      return `before:absolute before:top-0 before:w-[2px] before:bg-slate-600 before:h-6 lg:before:top-full lg:before:h-[2px] lg:before:w-full ${activeParentMenuItemClass}`;
    };

    return (
      <ul {...ulProps} className={`flex flex-col gap-5 relative ${className}`}>
        {arrMenuFilterExclude.current.map(
          ({ id, name, href, bgColorChild, children }, index) => {
            const delaySequenceClass = classNames({
              'delay-[300ms]': index === 0 || index === 4,
              'delay-[400ms]': index === 1 || index === 3,
              'delay-[500ms]': index === 2,
            });
            const LinkHref = (hasLink: boolean, href: string) => (
              <a
                href={href}
                className={`pl-2 lg:pr-2 relative z-[1] ${
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
                key={id}
                className={`w-full transition duration-200 lg:border-2 lg: border-transparent lg:w-fit ${
                  !isParent ? 'lg:flex lg:py-0' : 'lg:py-1'
                } ${handleActiveMenuItem(
                  id
                )} ${delaySequenceClass} ${transitionTextClass}`}
                onMouseOver={() => width >= 1200 && handleHoverMenuItems(id)}
                onMouseLeave={() => width >= 1200 && handleLeaveMenuItems(id)}
              >
                <div className="flex">
                  {href.search(/#/g) >= 0 ? (
                    LinkHref(false, '#')
                  ) : (
                    <Link href={href}>{LinkHref(true, href)}</Link>
                  )}
                  {children.length > 0 &&
                    width < 1200 &&
                    (arrIdMenuOpen.includes(id) ? (
                      <MinusSmallIcon
                        className="h-6 w-6 ml-1 inline cursor-pointer lg:ml-0 lg:mr-1"
                        onClick={() => handleToggleMenuItems(id)}
                      />
                    ) : (
                      <PlusSmallIcon
                        className="h-6 w-6 ml-1 inline cursor-pointer lg:ml-0 lg:mr-1"
                        onClick={() => handleToggleMenuItems(id)}
                      />
                    ))}
                  {width >= 1200 &&
                    children.length > 0 &&
                    (isParent ? (
                      <ChevronDownIcon className="h-5 w-5 ml-1 inline lg:ml-0 lg:mr-1" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 ml-1 inline lg:ml-0 lg:mr-1" />
                    ))}
                </div>
                {children.length > 0 && (
                  <div
                    className={`overflow-hidden lg:absolute lg:overflow-visible ${
                      arrIdMenuOpen.includes(id)
                        ? 'animate-trans-sub-menu-in lg:animate-none  lg:h-[300px] lg:w-[250px]'
                        : 'animate-trans-sub-menu-out lg:animate-none lg:w-0 lg:hidden'
                    }`}
                  >
                    <Menu
                      className={`ml-5 mt-5 p-5 lg:mt-0${
                        !isParent ? ' lg:left-44' : ''
                      }${
                        width < 1200
                          ? ' ' + bgColorChild
                          : ' lg:bg-white border-2'
                      }`}
                      arrMenu={children}
                      isParent={false}
                    />
                  </div>
                )}
              </li>
            );
          }
        )}
      </ul>
    );
  }
);

export default Menu;
