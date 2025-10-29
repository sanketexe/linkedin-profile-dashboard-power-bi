import type { SleepHealthRecord, AppointmentRecord } from '../types'
import { useDataStore } from '../stores/dataStore'
import { useFilterStore } from '../stores/filterStore'

export function useFilteredData() {
  const { sleepData, appointmentsData } = useDataStore()
  const { selectedGender, selectedOccupations, selectedDisorders, ageRange } = useFilterStore()
  
  // Apply filters to sleep data
  const filteredSleepData = sleepData.filter((record) => {
    // Gender filter
    if (selectedGender.length > 0 && !selectedGender.includes(record.Gender)) {
      return false
    }
    
    // Occupation filter
    if (selectedOccupations.length > 0 && !selectedOccupations.includes(record.Occupation)) {
      return false
    }
    
    // Disorder filter
    if (selectedDisorders.length > 0 && !selectedDisorders.includes(record.Sleep_Disorder)) {
      return false
    }
    
    // Age range filter
    if (record.Age < ageRange[0] || record.Age > ageRange[1]) {
      return false
    }
    
    return true
  })
  
  // Get person IDs from filtered data
  const filteredPersonIds = new Set(filteredSleepData.map(r => r.Person_ID))
  
  // Filter appointments based on filtered people
  const filteredAppointments = appointmentsData.filter(
    (apt) => filteredPersonIds.has(apt.Person_ID)
  )
  
  return {
    sleepData: filteredSleepData,
    appointmentsData: filteredAppointments,
  }
}
