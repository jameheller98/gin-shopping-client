import classNames from 'classnames';
import { useState } from 'react';
import { useDrawerContext } from '../../../state/drawer/DrawerContext';

export type TNavbar = {} & React.ComponentPropsWithoutRef<'nav'>;

const arrMenuTitle = ['HOME', 'PRODUCT', 'FAQ', 'ABOUT', 'LOGIN'];

const Navbar: React.FC<TNavbar> = ({ className, ...navProps }) => {
  const { openDrawer } = useDrawerContext();
  const [menuIndexActive, setMenuIndexActive] = useState(0);
  const transitionTextClass = classNames({
    'opacity-100 translate-x-0': openDrawer,
    'opacity-0 -translate-x-4': !openDrawer,
  });
  const transitionHorizonClass = classNames({
    'before:trans-horizon-active before:h-6': openDrawer,
    'before:h-0': !openDrawer,
  });
  const transitionHorizonActiveClass = classNames({
    'before:translate-y-0': menuIndexActive === 0,
    'before:translate-y-[44px]': menuIndexActive === 1,
    'before:translate-y-[88px]': menuIndexActive === 2,
    'before:translate-y-[132px]': menuIndexActive === 3,
    'before:translate-y-[176px]': menuIndexActive === 4,
  });

  return (
    <nav {...navProps} className={`${className}`}>
      <ul
        className={`flex flex-col gap-5 relative before:absolute before:top-0 before:w-[2px] before:bg-slate-600  ${transitionHorizonClass} ${transitionHorizonActiveClass}`}
      >
        {arrMenuTitle.map((title, index) => {
          const delaySequenceClass = classNames({
            'delay-[300ms]': index === 0 || index === 4,
            'delay-[400ms]': index === 1 || index === 3,
            'delay-[500ms]': index === 2,
          });

          return (
            <li
              key={title}
              className={`w-4/6 pl-2 cursor-pointer transition duration-200 ${delaySequenceClass} ${transitionTextClass}`}
              onClick={() => setMenuIndexActive(index)}
            >
              {title}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
