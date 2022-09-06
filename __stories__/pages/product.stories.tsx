import { ComponentMeta, ComponentStory } from '@storybook/react';
import dataProduct from '../../libs/product/dataProduct.json';
import { IProductData } from '../../libs/product/interfaces';
import Product from '../../pages/product';

export default {
  title: 'pages/Product',
  component: Product,
  argTypes: {},
} as ComponentMeta<typeof Product>;

const Template: ComponentStory<typeof Product> = (args) => (
  <Product {...args} />
);

export const Base = Template.bind({});

Base.args = {
  dataProduct: dataProduct as IProductData[],
};
