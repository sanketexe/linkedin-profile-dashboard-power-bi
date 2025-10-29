import { useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { useDataStore } from './stores/dataStore'

function App() {
  const { loadData, isLoading, error } = useDataStore()

  useEffect(() => {
    loadData()
  }, [loadData])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bi-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-bi-blue mx-auto mb-4"></div>
          <p className="text-bi-text-secondary text-lg">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bi-bg">
        <div className="text-center max-w-md">
          <div className="text-bi-red text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-bi-text mb-2">Error Loading Data</h2>
          <p className="text-bi-text-secondary">{error}</p>
          <button 
            onClick={() => loadData()} 
            className="mt-4 px-4 py-2 bg-bi-blue text-white rounded hover:bg-bi-blue-dark"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return <Dashboard />
}

export default App
