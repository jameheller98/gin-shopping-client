export type TCubeButton = {
  bgColor?: string;
  fromEffect?: string;
  borderColor?: string;
} & React.ComponentPropsWithoutRef<'button'>;

const CubeButton: React.FC<TCubeButton> = ({
  bgColor = 'bg-blue-400',
  fromEffect = 'after:from-blue-300',
  borderColor = 'border-blue-300',
  className,
  children,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={`relative group after:contents-[''] after:w-full after:h-full after:bg-[linear-gradient(to_right,var(--tw-gradient-from)_20%,var(--tw-gradient-to),var(--tw-gradient-from)_80%)] after:to-[rgba(0,0,0,0.4)] after:absolute after:left-0 after:top-[4px] after:rounded-lg after:shadow-[inset_0_10px_10px_0px,0_1px_3px_0px] ${fromEffect} ${className}`}
    >
      <span
        className={`relative rounded-lg shadow-[inset_0px_-20px_100px_-70px_rgba(0,0,0,0.5)] border-2 text-white px-2 py-[2px] inline-block z-[1] group-active:translate-y-[2px] ${bgColor} ${borderColor}`}
      >
        {children}
      </span>
    </button>
  );
};

export default CubeButton;
