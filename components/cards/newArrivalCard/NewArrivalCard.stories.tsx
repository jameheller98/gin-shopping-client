import { ComponentMeta, ComponentStory } from '@storybook/react';
import NewArrivalCard, { TNewArrivalCard } from './NewArrivalCard';
import { mockNewArrivalCardProps } from './NewArrivalCard.mocks';

export default {
  title: 'cards/NewArrivalCard',
  component: NewArrivalCard,
  argTypes: {},
} as ComponentMeta<typeof NewArrivalCard>;

const Template: ComponentStory<typeof NewArrivalCard> = (args) => (
  <NewArrivalCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockNewArrivalCardProps.base,
} as TNewArrivalCard;
