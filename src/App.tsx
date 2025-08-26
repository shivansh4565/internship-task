import { useState } from 'react';
import InputField from './Components/InputField';
import DataTable from './Components/DataTable';

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
];

const data = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Carol White', email: 'carol@example.com' },
];

function App() {
  const [inputValue, setInputValue] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  // Optionally filter data by input value (by name)
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-sm mb-6">
        <InputField
          label="Full Name"
          placeholder="Enter your name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          helperText="Please enter your legal name."
          errorMessage="Name cannot be empty"
          invalid={inputValue.trim() === ''}
          showClearButton
          variant="outlined"
          size="md"
        />
      </div>

      <div className="w-full max-w-4xl">
        <DataTable
          data={filteredData}
          columns={columns}
          selectable={true}
          onRowSelect={setSelectedRows}
        />
      </div>

      {selectedRows.length > 0 && (
        <div className="mt-6 w-full max-w-4xl">
          <h2 className="text-lg font-semibold mb-2">Selected Users</h2>
          <ul className="list-disc list-inside bg-white p-4 rounded shadow-inner">
            {selectedRows.map(user => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
