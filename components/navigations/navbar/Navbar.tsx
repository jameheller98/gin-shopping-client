import Menu from '../menu/Menu';
import { mockMenuProps } from '../menu/Menu.mocks';

export type TNavbar = {} & React.ComponentPropsWithoutRef<'nav'>;

const Navbar: React.FC<TNavbar> = ({ className, ...navProps }) => {
  return (
    <nav {...navProps} className={`${className}`}>
      <Menu {...mockMenuProps.base} />
    </nav>
  );
};

export default Navbar;
