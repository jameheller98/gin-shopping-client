import { ComponentMeta, ComponentStory } from '@storybook/react';
import Tooltip, { TTooltip } from './Tooltip';
import { mockTooltipProps } from './Tooltip.mocks';

export default {
  title: 'utilities/Tooltip',
  component: Tooltip,
  argTypes: {},
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockTooltipProps.base,
} as TTooltip;
