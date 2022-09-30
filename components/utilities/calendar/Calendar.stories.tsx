import { ComponentMeta, ComponentStory } from '@storybook/react';
import Calendar, { TCalendar } from './Calendar';
import { mockCalendarProps } from './Calendar.mocks';

export default {
  title: 'utilities/Calendar',
  component: Calendar,
  argTypes: {},
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockCalendarProps.base,
} as TCalendar;
