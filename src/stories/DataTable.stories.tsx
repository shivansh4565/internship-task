// Adjust this import based on your actual Storybook framework
import type { Meta, StoryObj } from '@storybook/react';  // <- or react-vite, react-webpack5, etc.
import DataTable from '../Components/DataTable';
import type { Column } from '../Components/DataTable';

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
];

const data: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Carol White', email: 'carol@example.com' },
];

const meta: Meta<typeof DataTable<User>> = {
  component: DataTable,
  title: 'UI/DataTable',
  argTypes: {
    loading: { control: 'boolean' },
    selectable: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data,
    columns,
    loading: false,
    selectable: false,
  },
};

export const WithRowSelection: Story = {
  args: {
    data,
    columns,
    selectable: true,
  },
  parameters: {
    controls: { exclude: ['onRowSelect'] },
  },
  render: (args: React.ComponentProps<typeof DataTable>) => (
    <DataTable
      {...args}
      onRowSelect={(selectedRows) => console.log('Selected rows:', selectedRows)}
    />
  ),
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns,
    loading: false,
  },
};
