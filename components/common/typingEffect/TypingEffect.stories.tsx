import { ComponentMeta, ComponentStory } from '@storybook/react';
import TypingEffect, { TTypingEffect } from './TypingEffect';
import { mockTypingEffectProps } from './TypingEffect.mocks';

export default {
  title: 'common/TypingEffect',
  component: TypingEffect,
  argTypes: {},
} as ComponentMeta<typeof TypingEffect>;

const Template: ComponentStory<typeof TypingEffect> = (args) => (
  <TypingEffect {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockTypingEffectProps.base,
} as TTypingEffect;
