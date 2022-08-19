import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDrawerContext } from '../../../state/drawer/DrawerContext';
import { useMenuContext } from '../../../state/menu/MenuContext';

export interface IMenuObject {
  id: string;
  name: string;
  bgColor: string;
  children: IMenuObject[];
}

export type TMenu = {
  arrMenu: IMenuObject[];
  isParent: boolean;
} & React.ComponentPropsWithoutRef<'ul'>;

const Menu: React.FC<TMenu> = ({ arrMenu, className, ...ulProps }) => {
  const { openDrawer } = useDrawerContext();
  const { idMenuActive, updateIdMenuActive } = useMenuContext();
  const [arrNameMenuOpen, setArrNameMenuOpen] = useState<IMenuObject['name'][]>(
    []
  );
  const transitionTextClass = classNames({
    'opacity-100 translate-x-0': openDrawer,
    'opacity-0 -translate-x-4': !openDrawer,
  });

  useEffect(() => {
    if (!openDrawer) {
      setArrNameMenuOpen([]);
    }
  }, [openDrawer]);

  const handleClickItem = (
    event: MouseEvent<HTMLSpanElement>,
    idMenu: string
  ) => {
    event.stopPropagation();
    updateIdMenuActive(idMenu);
  };

  const handleToggleMenuItems = useCallback(
    (nameMenu: IMenuObject['name']) => {
      if (arrNameMenuOpen.includes(nameMenu)) {
        setArrNameMenuOpen(
          arrNameMenuOpen.filter((nameMenuItem) => nameMenuItem !== nameMenu)
        );
      } else {
        setArrNameMenuOpen(arrNameMenuOpen.concat(nameMenu));
      }
    },
    [arrNameMenuOpen]
  );

  const handleActiveMenuItem = (idMenu: string) => {
    const activeParentMenuItemClass = classNames({
      'before:scale-y-1 before:origin-top before:h-6':
        openDrawer && idMenuActive === idMenu,
      'before:scale-y-0 before:origin-bottom before:h-6':
        openDrawer && idMenuActive !== idMenu,
    });

    return `before:absolute before:top-0 before:w-[2px] before:bg-slate-600 before:transition-transform before:duration-300 ${activeParentMenuItemClass}`;
  };

  return (
    <ul
      {...ulProps}
      className={`flex flex-col gap-5 relative ${arrMenu[0].bgColor} ${className}`}
    >
      {arrMenu.map(({ id, name, children }, index) => {
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
            <span
              className="pl-2 cursor-pointer"
              onClick={(e) => handleClickItem(e, id)}
            >
              {name}
            </span>
            {children.length > 0 &&
              (arrNameMenuOpen.includes(name) ? (
                <MinusSmIcon
                  className="h-7 w-7 ml-1 inline cursor-pointer"
                  onClick={() => handleToggleMenuItems(name)}
                />
              ) : (
                <PlusSmIcon
                  className="h-7 w-7 ml-1 inline cursor-pointer"
                  onClick={() => handleToggleMenuItems(name)}
                />
              ))}
            {children.length > 0 && (
              <Menu
                className={`mt-5 ml-5 p-5 ${
                  arrNameMenuOpen.includes(name) ? 'block' : 'hidden'
                }`}
                arrMenu={children}
                isParent={false}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
