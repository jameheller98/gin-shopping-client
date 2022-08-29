import { ComponentMeta, ComponentStory } from '@storybook/react';
import RectButton, { TRectButton } from './RectButton';
import { mockRectButtonProps } from './RectButton.mocks';

export default {
  title: 'buttons/RectButton',
  component: RectButton,
  argTypes: {},
} as ComponentMeta<typeof RectButton>;

const Template: ComponentStory<typeof RectButton> = (args) => (
  <RectButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockRectButtonProps.base,
} as TRectButton;
