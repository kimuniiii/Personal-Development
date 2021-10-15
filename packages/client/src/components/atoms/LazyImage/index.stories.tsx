import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Margin } from 'src/components/layouts/Margin';

import { LazyImage } from '.';

export default {
  component: LazyImage,
  title: 'atoms/LazyImage',
} as Meta;

type Props = React.ComponentProps<typeof LazyImage>;

const Template: Story<Props> = (args) => {
  return (
    <React.Fragment>
      {[...Array(10)].map((_, idx) => {
        return (
          <React.Fragment key={idx}>
            <LazyImage {...args} />
            <Margin bottom='16px' />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  src: '/images/react.jpg',
  alt: 'No Image',
  width: '160px',
  height: '160px',
};
