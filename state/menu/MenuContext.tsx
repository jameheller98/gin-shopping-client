import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

interface IMenuContext {
  idMenuActive: string;
  updateIdMenuActive: (IdMenu: string) => void;
}

const initialValue: IMenuContext = {
  idMenuActive: 'HOME',
  updateIdMenuActive: (IdMenu: string) => undefined,
};

const MenuContext = createContext<IMenuContext>(initialValue);

export const MenuProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [idMenuActive, setIdMenuActive] = useState('1');

  const value = useMemo(() => {
    const updateIdMenuActive = (nameMenu: string) => {
      setIdMenuActive(nameMenu);
    };

    return { idMenuActive, updateIdMenuActive };
  }, [idMenuActive]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenuContext = () => useContext(MenuContext);
