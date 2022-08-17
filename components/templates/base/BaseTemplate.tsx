export type TBaseTemplate = { sampleTextProp: string };

const BaseTemplate: React.FC<TBaseTemplate> = ({ sampleTextProp }) => {
  return <div>{sampleTextProp}</div>;
};

export default BaseTemplate;
