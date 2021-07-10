import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { SelectBox } from ".";

export default {
  title: "common/SelectBox",
  component: SelectBox,
} as Meta;

type Props = React.ComponentProps<typeof SelectBox>;

const Template: Story<Props> = (args) => <SelectBox {...args} />;

export const Basic = Template.bind({});
