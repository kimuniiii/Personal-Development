import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { SpProductCardSkeleton } from '.';

export default {
  title: 'organisms/SpProductCardSkeleton',
  component: SpProductCardSkeleton,
} as Meta;

type Props = React.ComponentProps<typeof SpProductCardSkeleton>;

const Template: Story<Props> = () => <SpProductCardSkeleton />;

export const Basic = Template.bind({});
