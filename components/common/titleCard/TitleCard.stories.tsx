import { ComponentMeta, ComponentStory } from '@storybook/react';
import TitleCard, { TTitleCard } from './TitleCard';
import { mockTitleCardProps } from './TitleCard.mocks';

export default {
  title: 'common/TitleCard',
  component: TitleCard,
  argTypes: {},
} as ComponentMeta<typeof TitleCard>;

const Template: ComponentStory<typeof TitleCard> = (args) => (
  <TitleCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockTitleCardProps.base,
} as TTitleCard;
