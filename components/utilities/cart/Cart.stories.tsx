import { ComponentMeta, ComponentStory } from '@storybook/react';
import Cart, { TCart } from './Cart';
import { mockCartProps } from './Cart.mocks';

export default {
  title: 'utilities/Cart',
  component: Cart,
  argTypes: {},
} as ComponentMeta<typeof Cart>;

const Template: ComponentStory<typeof Cart> = (args) => <Cart {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockCartProps.base,
} as TCart;
