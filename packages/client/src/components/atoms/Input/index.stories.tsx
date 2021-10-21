import React from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '.';

import type { Meta, Story } from '@storybook/react/types-6-0';

export default {
  component: Input,
  title: 'atoms/Input',
} as Meta;

type Props = React.ComponentProps<typeof Input>;

/**
 * @Memo mode: 'onChange'にするとエラーになるので、バリデーションの挙動はStorybookで確認できない
 * @Error RangeError: Maximum call stack size exceeded
 **/
const Template: Story<Props> = (args) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  return (
    <>
      <Input
        {...args}
        isError={!!errors.firstName}
        errors={errors}
        register={register('firstName', {
          pattern: {
            message: '大文字のアルファベットで入力してください！',
            value: /^[A-Z]+$/,
          },
          required: { message: '必須入力項目です！', value: true },
        })}
      />
    </>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  disabled: false,
  type: 'email',
  fontSizeValue: '12px',
  id: 'email',
  labelText: 'Email',
  labelType: 'requiredMarker',
  name: 'email',
  placeholder: '例: riot-ec-site@gmail.com',
  width: '343px',
};
