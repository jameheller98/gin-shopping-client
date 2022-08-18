import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header, { THeader } from './Header';
import { mockHeaderProps } from './Header.mocks';

export default {
  title: 'navigations/Header',
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockHeaderProps.base,
} as THeader;
