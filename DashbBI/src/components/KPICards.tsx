import { useMemo } from 'react'
import { useFilteredData } from '../lib/dataTransform'

function KPICards() {
  const { sleepData, appointmentsData } = useFilteredData()

  const kpis = useMemo(() => {
    // Calculate KPIs
    const totalPeople = sleepData.length
    const avgSleepQuality = sleepData.length > 0
      ? (sleepData.reduce((sum, r) => sum + r.Quality_of_Sleep, 0) / totalPeople).toFixed(2)
      : '0.00'
    
    const disorderCount = sleepData.filter(r => r.Sleep_Disorder !== 'None').length
    const disorderRate = totalPeople > 0
      ? ((disorderCount / totalPeople) * 100).toFixed(1)
      : '0.0'
    
    const totalAppointments = appointmentsData.length
    const avgCost = appointmentsData.length > 0
      ? (appointmentsData.reduce((sum, a) => sum + a.Appointment_Cost, 0) / totalAppointments).toFixed(0)
      : '0'

    return { totalPeople, avgSleepQuality, disorderRate, totalAppointments, avgCost }
  }, [sleepData, appointmentsData])

  const cards = [
    {
      title: 'Total People',
      value: kpis.totalPeople.toLocaleString(),
      icon: '👥',
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'from-blue-400 to-cyan-400',
    },
    {
      title: 'Avg Sleep Quality',
      value: `${kpis.avgSleepQuality} / 10`,
      icon: '😴',
      gradient: 'from-green-500 to-emerald-500',
      iconBg: 'from-green-400 to-emerald-400',
    },
    {
      title: 'Sleep Disorder Rate',
      value: `${kpis.disorderRate}%`,
      icon: '⚠️',
      gradient: 'from-orange-500 to-red-500',
      iconBg: 'from-orange-400 to-red-400',
    },
    {
      title: 'Total Appointments',
      value: kpis.totalAppointments.toLocaleString(),
      icon: '🏥',
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'from-purple-400 to-pink-400',
    },
    {
      title: 'Avg Appointment Cost',
      value: `$${kpis.avgCost}`,
      icon: '💰',
      gradient: 'from-yellow-500 to-orange-500',
      iconBg: 'from-yellow-400 to-orange-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className="bg-gradient-to-br from-indigo-50/90 to-purple-50/90 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200/30 p-6 card-hover overflow-hidden relative"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Gradient overlay */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-20 rounded-full blur-2xl`}></div>
          
          <div className="relative z-10">
            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center text-2xl shadow-md mb-3`}>
              {card.icon}
            </div>
            
            {/* Value */}
            <div className={`text-4xl font-extrabold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent mb-2`}>
              {card.value}
            </div>
            
            {/* Title */}
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              {card.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default KPICards
