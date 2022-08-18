import { ComponentMeta, ComponentStory } from '@storybook/react';
import Sidebar, { TSidebar } from './Sidebar';
import { mockSidebarProps } from './Sidebar.mocks';

export default {
  title: 'navigations/Sidebar',
  component: Sidebar,
  argTypes: {},
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <Sidebar {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockSidebarProps.base,
} as TSidebar;
