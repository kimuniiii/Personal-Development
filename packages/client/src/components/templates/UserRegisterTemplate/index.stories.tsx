import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { UserRegisterTemplate } from '.';

export default {
  title: 'templates/UserRegisterTemplate',
  component: UserRegisterTemplate,
} as Meta;

type Props = React.ComponentProps<typeof UserRegisterTemplate>;

const Template: Story<Props> = (args) => <UserRegisterTemplate {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  text: 'ユーザー登録画面',
};
