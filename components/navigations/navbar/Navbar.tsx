import { memo } from 'react';
import Menu from '../menu/Menu';
import { mockMenuProps } from '../menu/Menu.mocks';

export type TNavbar = {} & React.ComponentPropsWithoutRef<'nav'>;

// eslint-disable-next-line react/display-name
const Navbar: React.FC<TNavbar> = memo(({ className, ...navProps }) => {
  return (
    <nav {...navProps} className={`${className}`}>
      <Menu arrMenu={mockMenuProps.base.arrMenu} />
    </nav>
  );
});

export default Navbar;
