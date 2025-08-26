import type { Meta, StoryObj } from '@storybook/react';
import InputField from '../Components/InputField';

const meta: Meta<typeof InputField> = {
  component: InputField,
  title: 'UI/InputField',
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    variant: { control: 'radio', options: ['filled', 'outlined', 'ghost'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    showClearButton: { control: 'boolean' },
    showPasswordToggle: { control: 'boolean' },
    loading: { control: 'boolean' },
    theme: { control: 'radio', options: ['light', 'dark'] },
    type: { control: 'radio', options: ['text', 'password'] },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'This is a helper text',
    variant: 'outlined',
    size: 'md',
    theme: 'light',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    invalid: true,
    errorMessage: 'Invalid email address',
    variant: 'filled',
    size: 'md',
  },
};

export const PasswordField: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    showPasswordToggle: true,
    variant: 'outlined',
    size: 'md',
  },
};

export const WithClear: Story = {
  args: {
    label: 'Search',
    value: 'Query text',
    showClearButton: true,
    variant: 'ghost',
    size: 'lg',
  },
};

export const LoadingInput: Story = {
  args: {
    label: 'Loading Field',
    loading: true,
    placeholder: 'Loading...',
    variant: 'filled',
  },
};

export const DarkMode: Story = {
  args: {
    label: 'Dark Input',
    placeholder: 'Dark mode enabled',
    theme: 'dark',
    variant: 'outlined',
  },
};
