import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProductCard, { TProductCard } from './ProductCard';
import { mockProductCardProps } from './ProductCard.mocks';

export default {
  title: 'cards/ProductCard',
  component: ProductCard,
  argTypes: {},
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => (
  <ProductCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockProductCardProps.base,
} as TProductCard;
