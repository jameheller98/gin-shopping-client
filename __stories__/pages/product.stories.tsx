import { ComponentMeta, ComponentStory } from '@storybook/react';
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

Base.story = {
  parameters: {
    nextRouter: {
      asPath: '/product',
      pathname: '/product',
      route: '/product',
    },
  },
};
