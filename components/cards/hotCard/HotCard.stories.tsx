import { ComponentMeta, ComponentStory } from '@storybook/react';
import HotCard, { THotCard } from './HotCard';
import { mockHotCardProps } from './HotCard.mocks';

export default {
  title: 'cards/HotCard',
  component: HotCard,
  argTypes: {},
} as ComponentMeta<typeof HotCard>;

const Template: ComponentStory<typeof HotCard> = (args) => (
  <HotCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockHotCardProps.base,
} as THotCard;
