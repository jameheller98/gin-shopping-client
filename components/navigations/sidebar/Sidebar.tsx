import { XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { memo, ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import { openDrawerState } from '../../../state/drawer/drawerAtoms';

export type TSidebar = {
  keySideBar: string;
  contentSideBar: ReactNode;
  directionAnimate?: 'left' | 'right';
} & React.ComponentPropsWithoutRef<'div'>;

// eslint-disable-next-line react/display-name
const Sidebar: React.FC<TSidebar> = memo(
  ({
    keySideBar,
    contentSideBar,
    directionAnimate = 'left',
    className,
    ...divProps
  }) => {
    const [openDrawer, setOpenDrawer] = useRecoilState(
      openDrawerState(keySideBar)
    );

    const handleTransitionDrawerClass = (positionDrawer: 'left' | 'right') => {
      let classRight = '',
        classLeft = '';

      if (directionAnimate === 'left') {
        classRight = `${
          positionDrawer === 'right' && 'delay-[150ms] '
        }-translate-x-0 opacity-100`;
        classLeft = `${
          positionDrawer === 'left'
            ? '-translate-x-[133.33%] delay-[150ms]'
            : '-translate-x-[400%]'
        } opacity-0`;
      } else {
        classRight = `${
          positionDrawer === 'left' && 'delay-[150ms] '
        }-translate-x-0 opacity-100`;
        classLeft = `${
          positionDrawer === 'left'
            ? 'translate-x-[400%]'
            : 'translate-x-[133.33%] delay-[150ms]'
        } opacity-0`;
      }

      return classNames({
        [classRight]: openDrawer,
        [classLeft]: !openDrawer,
      });
    };

    return (
      <>
        <div
          {...divProps}
          className={`h-screen p-4 fixed top-0 z-[4] bg-white transition duration-300 overflow-auto ${
            directionAnimate === 'left' ? 'w-9/12 left-0' : 'w-10/12 right-0'
          } ${handleTransitionDrawerClass(
            directionAnimate === 'left' ? 'left' : 'right'
          )} ${className}`}
        >
          <XIcon
            className={`w-7 h-7 cursor-pointer ${
              directionAnimate === 'left' ? 'float-right' : 'float-left'
            }`}
            onClick={() => setOpenDrawer(false)}
          />
          {contentSideBar}
        </div>
        <div
          className={`w-3/12 h-screen fixed top-0 z-[3] bg-black bg-opacity-40 transition duration-300 ${
            directionAnimate === 'left' ? 'right-0' : 'left-0'
          } ${handleTransitionDrawerClass(
            directionAnimate === 'left' ? 'right' : 'left'
          )}`}
        />
      </>
    );
  }
);

export default Sidebar;
