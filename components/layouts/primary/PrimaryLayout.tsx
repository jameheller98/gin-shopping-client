export type TPrimaryLayout = { children: React.ReactNode };

const PrimaryLayout: React.FC<TPrimaryLayout> = ({ children }) => {
  return <div>{children}</div>;
};

export default PrimaryLayout;
