import { ComponentMeta, ComponentStory } from '@storybook/react';
import CubeButton, { TCubeButton } from './CubeButton';
import { mockCubeButtonProps } from './CubeButton.mocks';

export default {
  title: 'buttons/CubeButton',
  component: CubeButton,
  argTypes: {},
} as ComponentMeta<typeof CubeButton>;

const Template: ComponentStory<typeof CubeButton> = (args) => (
  <CubeButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCubeButtonProps.base,
} as TCubeButton;
