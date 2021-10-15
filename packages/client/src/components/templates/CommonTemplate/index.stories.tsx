import { ThemeProvider } from '@emotion/react';
import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { THEME } from 'src/styles/theme';

import { CommonTemplate } from '.';

export default {
  title: 'templates/CommonTemplate',
  component: CommonTemplate,
  decorators: [
    (Story): JSX.Element => (
      <ThemeProvider theme={THEME}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

type Props = React.ComponentProps<typeof CommonTemplate>;

const Template: Story<Props> = (args) => <CommonTemplate {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'CommonTemplate',
  isSideBar: false,
};
