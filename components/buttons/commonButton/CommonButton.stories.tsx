import { ComponentMeta, ComponentStory } from '@storybook/react';
import CommonButton, { TCommonButton } from './CommonButton';
import { mockCommonButtonProps } from './CommonButton.mocks';

export default {
  title: 'buttons/CommonButton',
  component: CommonButton,
  argTypes: {},
} as ComponentMeta<typeof CommonButton>;

const Template: ComponentStory<typeof CommonButton> = (args) => (
  <CommonButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCommonButtonProps.base,
} as TCommonButton;
