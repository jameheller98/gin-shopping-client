import { ComponentMeta, ComponentStory } from '@storybook/react';
import Brand, { TBrand } from './Brand';
import { mockBrandProps } from './Brand.mocks';

export default {
  title: 'common/Brand',
  component: Brand,
  argTypes: {},
} as ComponentMeta<typeof Brand>;

const Template: ComponentStory<typeof Brand> = (args) => <Brand {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockBrandProps.base,
} as TBrand;
