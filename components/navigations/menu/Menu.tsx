import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { openDrawerState } from '../../../state/drawer/drawerAtoms';
import useIsomorphicLayoutEffect from '../../../state/hooks/useIsomorphicLayoutEffect';
import { idMenuActiveState } from '../../../state/menu/menuAtoms';
import { arrMenuActiveFromQueryState } from '../../../state/menu/menuSelectors';

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

const Menu: React.FC<TMenu> = ({ arrMenu, className, ...ulProps }) => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useRecoilState(openDrawerState);
  const [idMenuActive, setIdMenuActive] = useRecoilState(idMenuActiveState);
  const [arrIdMenuOpen, setArrIdMenuOpen] = useState<IMenuObject['id'][]>([]);
  const idMenuActiveQuery = useRecoilValue(
    arrMenuActiveFromQueryState({
      query: router.query,
      parentName: router.route.split('/').filter((route) => Boolean(route))[0],
      fieldName: 'id',
    })
  );
  const transitionTextClass = classNames({
    'opacity-100 translate-x-0': openDrawer,
    'opacity-0 -translate-x-4': !openDrawer,
  });

  useIsomorphicLayoutEffect(() => {
    setIdMenuActive(idMenuActiveQuery[idMenuActiveQuery.length - 1]);
    setArrIdMenuOpen(idMenuActiveQuery.slice(0, idMenuActiveQuery.length - 1));
  }, [setIdMenuActive, setArrIdMenuOpen, idMenuActiveQuery]);

  const handleClickItem = (
    event: MouseEvent<HTMLSpanElement>,
    idMenu: string
  ) => {
    event.stopPropagation();
    setIdMenuActive(idMenu);
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
    [arrIdMenuOpen]
  );

  const handleActiveMenuItem = (idMenu: string) => {
    const activeParentMenuItemClass = classNames({
      'before:scale-y-1 before:origin-top before:h-6': idMenuActive === idMenu,
      'before:scale-y-0 before:origin-bottom before:h-6':
        idMenuActive !== idMenu,
    });

    return `before:absolute before:top-0 before:w-[2px] before:bg-slate-600 before:transition-transform before:duration-300 ${activeParentMenuItemClass}`;
  };

  return (
    <ul {...ulProps} className={`flex flex-col gap-5 relative ${className}`}>
      {arrMenu.map(({ id, name, href, bgColorChild, children }, index) => {
        const delaySequenceClass = classNames({
          'delay-[300ms]': index === 0 || index === 4,
          'delay-[400ms]': index === 1 || index === 3,
          'delay-[500ms]': index === 2,
        });

        return (
          <li
            key={name}
            className={`w-full transition duration-200 ${handleActiveMenuItem(
              id
            )} ${delaySequenceClass} ${transitionTextClass}`}
          >
            <Link href={href}>
              <a
                className={`pl-2 ${
                  idMenuActive !== id
                    ? 'pointer-events-auto'
                    : 'pointer-events-none'
                }`}
                onClick={(e) => {
                  if (idMenuActive !== id) handleClickItem(e, id);
                }}
              >
                {name}
              </a>
            </Link>
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
};

export default Menu;
