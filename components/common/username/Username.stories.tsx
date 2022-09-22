import { ComponentMeta, ComponentStory } from '@storybook/react';
import Username, { TUsername } from './Username';
import { mockUsernameProps } from './Username.mocks';

export default {
  title: 'common/Username',
  component: Username,
  argTypes: {},
} as ComponentMeta<typeof Username>;

const Template: ComponentStory<typeof Username> = (args) => (
  <Username {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockUsernameProps.base,
} as TUsername;
