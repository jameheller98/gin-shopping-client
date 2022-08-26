import Image from 'next/image';

export type TNewArrivalCard = {
  title: string;
  description: string;
  arrBgColor?: string[];
  shadowsColor?: string;
  reversePosition?: boolean;
} & React.ComponentPropsWithoutRef<'article'>;

const NewArrivalCard: React.FC<TNewArrivalCard> = ({
  title,
  description,
  arrBgColor = ['bg-slate-100', 'bg-slate-200'],
  shadowsColor = 'shadow-slate-400',
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
          <button className="text-md font-medium">More info</button>
        </div>
        <div className="grid grid-flow-col gap-3 overflow-hidden justify-center mt-2">
          <div className="overflow-hidden h-[50px] w-[50px]">
            <Image
              src="/home/card/men-white-shirt.jpg"
              alt="Men white shirt"
              width="360"
              height="490"
            />
          </div>
          <div className="overflow-hidden h-[50px] w-[50px]">
            <Image
              src="/home/card/men-white-shirt.jpg"
              alt="Men white shirt"
              width="360"
              height="490"
            />
          </div>
          <div className="overflow-hidden h-[50px] w-[50px]">
            <Image
              src="/home/card/men-white-shirt.jpg"
              alt="Men white shirt"
              width="360"
              height="490"
            />
          </div>
        </div>
      </section>
    </article>
  );
};

export default NewArrivalCard;
