import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProductGallery, { TProductGallery } from './ProductGallery';
import { mockProductGalleryProps } from './ProductGallery.mocks';

export default {
  title: 'galleries/ProductGallery',
  component: ProductGallery,
  argTypes: {},
} as ComponentMeta<typeof ProductGallery>;

const Template: ComponentStory<typeof ProductGallery> = (args) => (
  <ProductGallery {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockProductGalleryProps.base,
} as TProductGallery;
