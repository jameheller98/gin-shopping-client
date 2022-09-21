export type TCommonButton = {} & React.ComponentPropsWithoutRef<'button'>;

const CommonButton: React.FC<TCommonButton> = ({
  className,
  disabled,
  children,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={`text-slate-50 rounded-xl tracking-wide flex flex-row gap-2 items-center justify-center ${
        !disabled ? 'opacity-100 bg-slate-800' : 'opacity-50 bg-slate-400'
      } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CommonButton;
