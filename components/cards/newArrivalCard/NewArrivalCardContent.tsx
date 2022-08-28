import { Transition } from '@headlessui/react';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import CubeButton from '../../buttons/CubeButton/CubeButton';
import { TNewArrivalCard } from './NewArrivalCard';

export type TNewArrivalCardContent = Required<
  Pick<TNewArrivalCard, 'title' | 'description' | 'styleProps'>
> &
  React.ComponentPropsWithoutRef<'section'>;

const NewArrivalCardContent: React.FC<TNewArrivalCardContent> = ({
  title,
  description,
  styleProps,
  className,
  ...sectionProps
}) => {
  const { shadowsColor, arrBgColor, buttonStyle } = styleProps;

  return (
    <section
      {...sectionProps}
      className={`grid grid-flow-row gap-1 max-h-[200px] ${className}`}
    >
      <Transition.Child
        as={Fragment}
        enter="transition-[transform,opacity] duration-1000 delay-1000"
        enterFrom="translate-x-5 opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="transition-[transform,opacity] duration-1000"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="translate-x-5 opacity-0"
      >
        <h1 className="text-lg font-medium">{title}</h1>
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition-[transform,opacity] duration-1000 delay-[1200ms]"
        enterFrom="translate-x-5 opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="transition-[transform,opacity] duration-1000"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="translate-x-5 opacity-0"
      >
        <p
          className={`text-sm overflow-auto h-[100%] px-2 py-1 rounded-sm shadow-[0_0_0_2px,3px_3px_0_2px] ${shadowsColor} ${arrBgColor[1]}`}
        >
          {description}
        </p>
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition-[transform,opacity] duration-1000 delay-[1400ms]"
        enterFrom="translate-x-5 opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="transition-[transform,opacity] duration-1000"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="translate-x-5 opacity-0"
      >
        <div className="mt-2 text-right">
          <CubeButton
            {...buttonStyle}
            className="text-sm none-tap-highlight-color"
          >
            More info <ArrowRightIcon className="inline h-4" />
          </CubeButton>
        </div>
      </Transition.Child>
    </section>
  );
};

export default NewArrivalCardContent;
