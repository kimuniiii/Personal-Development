import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { PcProductCardSkeleton } from '.';

export default {
  title: 'organisms/PcProductCardSkeleton',
  component: PcProductCardSkeleton,
} as Meta;

type Props = React.ComponentProps<typeof PcProductCardSkeleton>;

const Template: Story<Props> = () => <PcProductCardSkeleton />;

export const Basic = Template.bind({});
