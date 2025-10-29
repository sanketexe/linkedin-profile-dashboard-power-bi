import KPICards from './KPICards'
import BarChartComponent from './charts/BarChart'
import LineChartComponent from './charts/LineChart'
import { PieChart } from './charts/PieChart'
import { ScatterPlot } from './charts/ScatterPlot'
import { FilterPanel } from './FilterPanel'
import { DataTable } from './DataTable'

function Dashboard() {
  return (
    <div className="flex min-h-screen" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Left Sidebar - Filters */}
      <FilterPanel />

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Header - Beautiful Gradient */}
        <header className="bg-gradient-to-r from-indigo-50/95 to-purple-50/95 backdrop-blur-lg shadow-lg border-b border-purple-200/50 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg">
                🏥
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Sleep Health Analytics
                </h1>
                <p className="text-xs text-gray-500 font-medium">Real-time Health Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-xl">
                ⚡ Live Dashboard
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Beautiful Background */}
        <main className="px-8 py-8">
          {/* KPI Cards Row - With animations */}
          <div className="fade-in">
            <KPICards />
          </div>

          {/* Charts Grid - First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Bar Chart */}
            <BarChartComponent />
            
            {/* Line Chart */}
            <LineChartComponent />
          </div>

          {/* Charts Grid - Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 fade-in" style={{ animationDelay: '0.4s' }}>
            {/* Pie Chart */}
            <PieChart />
            
            {/* Scatter Plot */}
            <ScatterPlot />
          </div>

          {/* Data Table - Full Width */}
          <div className="mt-6 fade-in" style={{ animationDelay: '0.6s' }}>
            <DataTable />
          </div>

          {/* Footer Info - Beautiful styling */}
          <div className="mt-10 text-center fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="inline-block bg-gradient-to-r from-indigo-50/90 to-purple-50/90 backdrop-blur-md rounded-2xl px-8 py-4 shadow-lg border border-purple-200/30">
              <p className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                📊 Dashboard v2.0 | 374 People · 850 Appointments
              </p>
              <p className="text-xs text-gray-700 mt-1">
                Use filters on the left to explore data interactively · Updated in real-time
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
