import { ComponentMeta, ComponentStory } from '@storybook/react';
import Canvas, { TCanvas } from './Canvas';
import { mockCanvasProps } from './Canvas.mocks';

export default {
  title: 'utilities/Canvas',
  component: Canvas,
  argTypes: {},
} as ComponentMeta<typeof Canvas>;

const Template: ComponentStory<typeof Canvas> = (args) => <Canvas {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockCanvasProps.base,
} as TCanvas;
