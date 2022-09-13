import { ComponentMeta, ComponentStory } from '@storybook/react';
import CartCard, { TCartCard } from './CartCard';
import { mockCartCardProps } from './CartCard.mocks';

export default {
  title: 'cards/CartCard',
  component: CartCard,
  argTypes: {},
} as ComponentMeta<typeof CartCard>;

const Template: ComponentStory<typeof CartCard> = (args) => (
  <CartCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCartCardProps.base,
} as TCartCard;
