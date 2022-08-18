import { ComponentMeta, ComponentStory } from '@storybook/react';
import Footer, { TFooter } from './Footer';
import { mockFooterProps } from './Footer.mocks';

export default {
  title: 'navigations/Footer',
  component: Footer,
  argTypes: {},
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockFooterProps.base,
} as TFooter;
