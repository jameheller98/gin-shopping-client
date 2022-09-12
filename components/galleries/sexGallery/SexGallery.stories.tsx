import { ComponentMeta, ComponentStory } from '@storybook/react';
import SexGallery, { TSexGallery } from './SexGallery';
import { mockSexGalleryProps } from './SexGallery.mocks';

export default {
  title: 'galleries/SexGallery',
  component: SexGallery,
  argTypes: {},
} as ComponentMeta<typeof SexGallery>;

const Template: ComponentStory<typeof SexGallery> = (args) => (
  <SexGallery {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockSexGalleryProps.base,
} as TSexGallery;
