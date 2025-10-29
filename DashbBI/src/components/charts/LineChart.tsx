import { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { useFilteredData } from '../../lib/dataTransform'

function LineChart() {
  const { appointmentsData } = useFilteredData()

  const chartOption = useMemo(() => {
    // Group appointments by month
    const appointmentsByMonth: { [key: string]: number } = {}
    
    appointmentsData.forEach((apt) => {
      const date = new Date(apt.Appointment_Date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      appointmentsByMonth[monthKey] = (appointmentsByMonth[monthKey] || 0) + 1
    })

    // Sort by date and prepare data
    const sortedMonths = Object.keys(appointmentsByMonth).sort()
    const counts = sortedMonths.map((month) => appointmentsByMonth[month])

    // Format month labels (e.g., "2023-10" -> "Oct '23")
    const labels = sortedMonths.map((month) => {
      const [year, monthNum] = month.split('-')
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return `${monthNames[parseInt(monthNum) - 1]} '${year.slice(2)}`
    })

    return {
      title: {
        text: 'Medical Appointments Over Time',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: '#323130',
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const data = params[0]
          return `<strong>${data.name}</strong><br/>Appointments: <strong>${data.value}</strong>`
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: labels,
        boundaryGap: false,
        axisLabel: {
          rotate: 45,
          fontSize: 11,
        },
        axisLine: {
          lineStyle: {
            color: '#EDEBE9',
          },
        },
      },
      yAxis: {
        type: 'value',
        name: 'Number of Appointments',
        axisLine: {
          lineStyle: {
            color: '#EDEBE9',
          },
        },
      },
      series: [
        {
          name: 'Appointments',
          type: 'line',
          data: counts,
          smooth: true,
          lineStyle: {
            color: '#107C10',
            width: 3,
          },
          itemStyle: {
            color: '#107C10',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(16, 124, 16, 0.3)' },
                { offset: 1, color: 'rgba(16, 124, 16, 0.05)' },
              ],
            },
          },
          emphasis: {
            itemStyle: {
              color: '#0B5A0A',
              borderColor: '#fff',
              borderWidth: 2,
            },
          },
        },
      ],
    }
  }, [appointmentsData])

  return (
    <div className="bg-gradient-to-br from-indigo-50/90 to-purple-50/90 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/30 p-6 card-hover">
      <ReactECharts
        option={chartOption}
        style={{ height: '400px' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  )
}

export default LineChart
