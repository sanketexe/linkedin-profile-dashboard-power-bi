import ReactECharts from 'echarts-for-react';
import { useDataStore } from '../../stores/dataStore';
import { useFilterStore } from '../../stores/filterStore';
import { useMemo } from 'react';
import type { SleepHealthRecord } from '../../types';

export const PieChart = () => {
  const { sleepData } = useDataStore();
  const { selectedGender, selectedOccupations, selectedDisorders, ageRange } = useFilterStore();

  const filteredData = useMemo(() => {
    return sleepData.filter((person: SleepHealthRecord) => {
      if (selectedGender.length > 0 && !selectedGender.includes(person.Gender)) return false;
      if (selectedOccupations.length > 0 && !selectedOccupations.includes(person.Occupation)) return false;
      if (selectedDisorders.length > 0 && !selectedDisorders.includes(person.Sleep_Disorder)) return false;
      if (person.Age < ageRange[0] || person.Age > ageRange[1]) return false;
      return true;
    });
  }, [sleepData, selectedGender, selectedOccupations, selectedDisorders, ageRange]);

  const chartData = useMemo(() => {
    const disorderCounts: Record<string, number> = {};
    filteredData.forEach((person: SleepHealthRecord) => {
      disorderCounts[person.Sleep_Disorder] = (disorderCounts[person.Sleep_Disorder] || 0) + 1;
    });
    
    return Object.entries(disorderCounts).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  const option = {
    title: {
      text: 'Sleep Disorder Distribution',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      bottom: 10,
      left: 'center',
    },
    color: ['#0078D4', '#107C10', '#FF8C00', '#D13438', '#8764B8'],
    series: [
      {
        name: 'Sleep Disorders',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}: {d}%',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        data: chartData,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/90 to-purple-50/90 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/30 p-6 card-hover">
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  );
};
