import { ComponentMeta, ComponentStory } from '@storybook/react';
import Menu, { TMenu } from './Menu';
import { mockMenuProps } from './Menu.mocks';

export default {
  title: 'navigations/Menu',
  component: Menu,
  argTypes: {},
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockMenuProps.base,
} as TMenu;
