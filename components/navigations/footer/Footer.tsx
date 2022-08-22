export type TFooter = {} & React.ComponentPropsWithoutRef<'footer'>;

const Footer: React.FC<TFooter> = ({ className, ...footerProps }) => {
  return (
    <footer
      {...footerProps}
      className={`bg-slate-200 w-full flex flex-col items-center justify-center p-5 ${className}`}
    >
      <i>Copyright &copy; {new Date().getFullYear()} Design HoangTuan</i>
    </footer>
  );
};

export default Footer;
