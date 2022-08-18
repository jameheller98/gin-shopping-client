export type TFooter = {} & React.ComponentPropsWithoutRef<'footer'>;

const Footer: React.FC<TFooter> = ({ className, ...footerProps }) => {
  return (
    <footer {...footerProps} className={`${className}`}>
      Footer
    </footer>
  );
};

export default Footer;
