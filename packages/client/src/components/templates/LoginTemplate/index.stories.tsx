import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { LoginTemplate } from '.';

export default {
  title: 'templates/LoginTemplate',
  component: LoginTemplate,
} as Meta;

type Props = React.ComponentProps<typeof LoginTemplate>;

const Template: Story<Props> = (args) => <LoginTemplate {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  text: 'ログイン画面',
};
