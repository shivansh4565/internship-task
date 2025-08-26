import { useState, useMemo } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  rowKey?: keyof T;
}

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  rowKey = 'id' as keyof T,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;

    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === col.dataIndex && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: col.dataIndex, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
return [...data].sort((a, b) => {
  const aVal = a[sortConfig.key];
  const bVal = b[sortConfig.key];

  if (aVal === null || aVal === undefined) return 1;
  if (bVal === null || bVal === undefined) return -1;

  if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
  if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
  return 0;
});
  }, [data, sortConfig]);

  const handleSelectRow = (row: T) => {
    const rowIdentifier = row[rowKey];
    const isSelected = selectedRows.some(selected => selected[rowKey] === rowIdentifier);

    let updated: T[];
    if (isSelected) {
      updated = selectedRows.filter(selected => selected[rowKey] !== rowIdentifier);
    } else {
      updated = [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  const isRowSelected = (row: T) => {
    const rowIdentifier = row[rowKey];
    return selectedRows.some(selected => selected[rowKey] === rowIdentifier);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {selectable && <th className="p-4 border border-gray-200 rounded-tl-lg"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-4 text-left border border-gray-200 font-semibold text-gray-700 cursor-pointer select-none transition-colors duration-200 hover:bg-gray-200"
                onClick={() => handleSort(col)}
              >
                <div className="flex items-center">
                  {col.title}
                  {col.sortable && sortConfig?.key === col.dataIndex && (
                    <span className="ml-2">
                      {sortConfig.direction === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center p-6 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center p-6 text-gray-500">
                No data available.
              </td>
            </tr>
          ) : (
            sortedData.map((row) => (
              <tr
                key={String(row[rowKey])}
                className={`transition-colors duration-200 ${isRowSelected(row) ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
              >
                {selectable && (
                  <td className="p-4 border border-gray-200">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 rounded-full"
                      checked={isRowSelected(row)}
                      onChange={() => handleSelectRow(row)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-4 border border-gray-200 text-gray-800">
                    {String(row[col.dataIndex] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
