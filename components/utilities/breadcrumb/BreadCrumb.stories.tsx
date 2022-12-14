import { ComponentMeta, ComponentStory } from '@storybook/react';
import BreadCrumb, { TBreadCrumb } from './BreadCrumb';
import { mockBreadCrumbProps } from './BreadCrumb.mocks';

export default {
  title: 'utilities/BreadCrumb',
  component: BreadCrumb,
  argTypes: {},
} as ComponentMeta<typeof BreadCrumb>;

const Template: ComponentStory<typeof BreadCrumb> = (args) => (
  <BreadCrumb {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockBreadCrumbProps.base,
} as TBreadCrumb;

Base.story = {
  parameters: {
    nextRouter: {
      asPath: '/product/men/shirts',
      pathname: '/product/[sex]/[cat]',
      route: '/product/[sex]/[cat]',
      query: { sex: 'men', cat: 'shirts' },
    },
  },
};
