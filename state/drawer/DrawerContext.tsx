import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

interface IDrawerContext {
  openDrawer: boolean;
  onOpenDrawer: (openDrawer: boolean) => void;
}

const initialValue: IDrawerContext = {
  openDrawer: false,
  onOpenDrawer: (openDrawer: boolean) => undefined,
};

const DrawerContext = createContext<IDrawerContext>(initialValue);

export const DrawerProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const value = useMemo(() => {
    const onOpenDrawer = (openDrawer: boolean) => {
      setOpenDrawer(openDrawer);
    };

    return { openDrawer, onOpenDrawer };
  }, [openDrawer]);

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export const useDrawerContext = () => useContext(DrawerContext);
