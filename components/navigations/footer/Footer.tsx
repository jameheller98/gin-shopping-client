export type TFooter = {} & React.ComponentPropsWithoutRef<'footer'>;

const Footer: React.FC<TFooter> = ({ className, ...footerProps }) => {
  return (
    <footer
      {...footerProps}
      className={`bg-slate-200 w-full flex flex-col items-center justify-center p-5 ${className}`}
    >
      <i>Copyright &copy; {new Date().getFullYear()} Design HoangTuan</i>
      <section className="text-xs font-light mt-2">
        <a
          href="https://www.flaticon.com/free-icons/facebook"
          title="facebook icons"
        >
          Facebook icons created by Freepik - Flaticon
        </a>
        <br />
        <a
          href="https://www.flaticon.com/free-icons/twitter"
          title="twitter icons"
        >
          Twitter icons created by Freepik - Flaticon
        </a>
        <br />
        <a
          href="https://www.flaticon.com/free-icons/github"
          title="github icons"
        >
          Github icons created by Freepik - Flaticon
        </a>
      </section>
    </footer>
  );
};

export default Footer;
