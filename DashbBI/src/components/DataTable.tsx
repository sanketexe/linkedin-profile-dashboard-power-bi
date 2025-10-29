import { useState, useMemo } from 'react';
import { useFilteredData } from '../lib/dataTransform';

type TableType = 'sleep' | 'appointments';

export const DataTable = () => {
  const { sleepData, appointmentsData } = useFilteredData();
  const [activeTable, setActiveTable] = useState<TableType>('sleep');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 10;

  // Get current data based on active table
  const currentData = activeTable === 'sleep' ? sleepData : appointmentsData;

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return currentData;
    
    return currentData.filter((row) => {
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [currentData, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredData.slice(startIndex, endIndex);

  // Get column headers
  const columns = currentData.length > 0 ? Object.keys(currentData[0]) : [];

  // Reset to page 1 when table or search changes
  const handleTableChange = (table: TableType) => {
    setActiveTable(table);
    setCurrentPage(1);
    setSearchTerm('');
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/90 to-purple-50/90 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/30 p-6 card-hover">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            📊
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Data Explorer
            </h2>
            <p className="text-xs text-gray-600">View and search raw datasets</p>
          </div>
        </div>

        {/* Table Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => handleTableChange('sleep')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTable === 'sleep'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                : 'bg-white/50 text-gray-700 hover:bg-white/80'
            }`}
          >
            Sleep Health ({sleepData.length})
          </button>
          <button
            onClick={() => handleTableChange('appointments')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              activeTable === 'appointments'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                : 'bg-white/50 text-gray-700 hover:bg-white/80'
            }`}
          >
            Appointments ({appointmentsData.length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search across all columns..."
            className="w-full px-4 py-3 pl-10 rounded-lg border-2 border-purple-200/50 focus:border-purple-400 focus:outline-none bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400"
          />
          <span className="absolute left-3 top-3.5 text-purple-400">🔍</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-purple-200/30 bg-white/50">
        <table className="min-w-full divide-y divide-purple-200/50">
          <thead className="bg-gradient-to-r from-purple-100/80 to-indigo-100/80">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-left text-xs font-bold text-purple-900 uppercase tracking-wider whitespace-nowrap"
                >
                  {column.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white/30 divide-y divide-purple-200/30">
            {currentRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-purple-50/50 transition-colors">
                {columns.map((column) => (
                  <td
                    key={column}
                    className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {String(row[column as keyof typeof row])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold text-purple-600">{startIndex + 1}</span> to{' '}
          <span className="font-semibold text-purple-600">{Math.min(endIndex, filteredData.length)}</span> of{' '}
          <span className="font-semibold text-purple-600">{filteredData.length}</span> records
          {searchTerm && (
            <span className="ml-2 text-xs">
              (filtered from {currentData.length} total)
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-white/50 text-gray-700 font-semibold text-sm hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                      : 'bg-white/50 text-gray-700 hover:bg-white/80'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-white/50 text-gray-700 font-semibold text-sm hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Export Button */}
      <div className="mt-4 pt-4 border-t border-purple-200/30 flex justify-end">
        <button
          onClick={() => {
            const dataStr = JSON.stringify(filteredData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${activeTable}_data_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>📥</span>
          Export to JSON
        </button>
      </div>
    </div>
  );
};
