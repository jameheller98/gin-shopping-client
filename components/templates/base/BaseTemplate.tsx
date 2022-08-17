export type TBaseTemplate = { sampleTextProp: string };

const BaseTemplate: React.FC<TBaseTemplate> = ({ sampleTextProp }) => {
  return <div className="">{sampleTextProp}</div>;
};

export default BaseTemplate;
