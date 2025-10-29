import ReactECharts from 'echarts-for-react';
import { useDataStore } from '../../stores/dataStore';
import { useFilterStore } from '../../stores/filterStore';
import { useMemo } from 'react';
import type { SleepHealthRecord, AppointmentRecord } from '../../types';

export const ScatterPlot = () => {
  const { sleepData, appointmentsData } = useDataStore();
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
    const appointmentCounts: Record<string, number> = {};
    appointmentsData.forEach((apt: AppointmentRecord) => {
      appointmentCounts[apt.Person_ID] = (appointmentCounts[apt.Person_ID] || 0) + 1;
    });

    const data = {
      None: [] as number[][],
      Insomnia: [] as number[][],
      'Sleep Apnea': [] as number[][],
    };

    filteredData.forEach((person: SleepHealthRecord) => {
      const appointmentCount = appointmentCounts[person.Person_ID] || 0;
      const point = [appointmentCount, person.Quality_of_Sleep];
      
      if (person.Sleep_Disorder === 'None') data.None.push(point);
      else if (person.Sleep_Disorder === 'Insomnia') data.Insomnia.push(point);
      else if (person.Sleep_Disorder === 'Sleep Apnea') data['Sleep Apnea'].push(point);
    });

    return data;
  }, [filteredData, appointmentsData]);

  const option = {
    title: {
      text: 'Sleep Quality vs. Number of Appointments',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `Appointments: ${params.value[0]}<br/>Sleep Quality: ${params.value[1]}`;
      },
    },
    legend: {
      data: ['None', 'Insomnia', 'Sleep Apnea'],
      bottom: 10,
    },
    xAxis: {
      name: 'Number of Appointments',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      name: 'Sleep Quality (1-10)',
      nameLocation: 'middle',
      nameGap: 40,
      min: 0,
      max: 10,
    },
    color: ['#107C10', '#FF8C00', '#D13438'],
    series: [
      {
        name: 'None',
        type: 'scatter',
        data: chartData.None,
        symbolSize: 8,
      },
      {
        name: 'Insomnia',
        type: 'scatter',
        data: chartData.Insomnia,
        symbolSize: 8,
      },
      {
        name: 'Sleep Apnea',
        type: 'scatter',
        data: chartData['Sleep Apnea'],
        symbolSize: 8,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/90 to-purple-50/90 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/30 p-6 card-hover">
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  );
};
