import { ArrowRightIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import CubeButton, { TCubeButton } from '../../buttons/CubeButton/CubeButton';

export type TNewArrivalCard = {
  title: string;
  description: string;
  arrBgColor?: string[];
  shadowsColor?: string;
  buttonStyle?: Pick<TCubeButton, 'bgColor' | 'fromEffect' | 'borderColor'>;
  reversePosition?: boolean;
} & React.ComponentPropsWithoutRef<'article'>;

const NewArrivalCard: React.FC<TNewArrivalCard> = ({
  title,
  description,
  arrBgColor = ['bg-slate-100', 'bg-slate-200'],
  shadowsColor = 'shadow-slate-400',
  buttonStyle,
  reversePosition = false,
  className,
  ...articleProps
}) => {
  return (
    <article
      {...articleProps}
      className={`grid grid-flow-col p-3 gap-3 ${arrBgColor[0]} ${className}`}
    >
      <section
        className={`overflow-hidden h-[200px] w-[180px]${
          reversePosition ? ' order-last' : ''
        }`}
      >
        <Image
          src="/home/card/men-white-shirt.jpg"
          alt="Men white shirt"
          width="360"
          height="490"
          priority
        />
      </section>
      <section className="grid grid-flow-row gap-1 max-h-[200px]">
        <h1 className="text-lg font-medium">{title}</h1>
        <p
          className={`text-sm overflow-auto h-[100%] px-2 py-1 rounded-sm shadow-[0_0_0_2px,3px_3px_0_2px] ${shadowsColor} ${arrBgColor[1]}`}
        >
          {description}
        </p>
        <div className="mt-2 text-right">
          <CubeButton {...buttonStyle} className="text-sm">
            More info <ArrowRightIcon className="inline h-4" />
          </CubeButton>
        </div>
      </section>
    </article>
  );
};

export default NewArrivalCard;
