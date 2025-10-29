import { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { useFilteredData } from '../../lib/dataTransform'
import { groupBy } from 'lodash'

function BarChart() {
  const { sleepData } = useFilteredData()

  const chartOption = useMemo(() => {
    // Group by occupation and calculate average sleep quality
    const grouped = groupBy(sleepData, 'Occupation')
    const occupations = Object.keys(grouped).sort()
    const avgQuality = occupations.map((occ) => {
      const records = grouped[occ]
      const avg = records.reduce((sum, r) => sum + r.Quality_of_Sleep, 0) / records.length
      return Number(avg.toFixed(2))
    })

    return {
      title: {
        text: 'Average Sleep Quality by Occupation',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: '#323130',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: any) => {
          const data = params[0]
          return `<strong>${data.name}</strong><br/>Avg Sleep Quality: <strong>${data.value}</strong> / 10`
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
        data: occupations,
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
        name: 'Sleep Quality (1-10)',
        min: 0,
        max: 10,
        axisLine: {
          lineStyle: {
            color: '#EDEBE9',
          },
        },
      },
      series: [
        {
          name: 'Sleep Quality',
          type: 'bar',
          data: avgQuality,
          itemStyle: {
            color: '#0078D4',
            borderRadius: [4, 4, 0, 0],
          },
          emphasis: {
            itemStyle: {
              color: '#106EBE',
            },
          },
        },
      ],
    }
  }, [sleepData])

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

export default BarChart
