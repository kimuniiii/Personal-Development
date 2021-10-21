import React from 'react';

import { ErrorTemplate } from '.';

import type { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'templates/ErrorTemplate',
  component: ErrorTemplate,
} as Meta;

type Props = React.ComponentProps<typeof ErrorTemplate>;

const Template: Story<Props> = (args) => <ErrorTemplate {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  error: {
    name: 'Error',
    message: 'Error Message',
    stack: 'Error Stack',
  },
};
