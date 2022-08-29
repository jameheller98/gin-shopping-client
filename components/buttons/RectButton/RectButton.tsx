import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';

export type TRectButton = {} & React.ComponentPropsWithoutRef<'button'>;

const RectButton: React.FC<TRectButton> = ({
  className,
  children,
  ...Buttonprops
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <Transition
      {...Buttonprops}
      as="button"
      className={`border-[3px] border-white text-white px-4 py-2 transition-[padding,letter-spacing,background-color,color,border-color,opacity] duration-500 tracking-wide hover:px-5 hover:py-3 hover:tracking-wider hover:bg-slate-900 hover:bg-opacity-30 active:bg-opacity-40 active:duration-75 active:text-opacity-90 active:border-opacity-90 ${className}`}
      show={isVisible}
      enter="delay-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <Transition.Child
        as="span"
        className="inline-block"
        enter="transition-[transform,opacity] delay-700 duration-1000"
        enterFrom="scale-50 opacity-0"
        enterTo="scale-100 opacity-100"
      >
        {children}
      </Transition.Child>
    </Transition>
  );
};

export default RectButton;
