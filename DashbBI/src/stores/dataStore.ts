import { create } from 'zustand'
import Papa from 'papaparse'
import type { SleepHealthRecord, AppointmentRecord } from '../types'

interface DataState {
  sleepData: SleepHealthRecord[]
  appointmentsData: AppointmentRecord[]
  isLoading: boolean
  error: string | null
  loadData: () => Promise<void>
}

export const useDataStore = create<DataState>((set) => ({
  sleepData: [],
  appointmentsData: [],
  isLoading: false,
  error: null,
  
  loadData: async () => {
    set({ isLoading: true, error: null })
    
    try {
      // Load sleep health data
      const sleepResponse = await fetch('/data/sleep_health.csv')
      const sleepText = await sleepResponse.text()
      
      const sleepResult = Papa.parse<SleepHealthRecord>(sleepText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      })
      
      // Load appointments data
      const appointmentsResponse = await fetch('/data/medical_appointments.csv')
      const appointmentsText = await appointmentsResponse.text()
      
      const appointmentsResult = Papa.parse<AppointmentRecord>(appointmentsText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      })
      
      set({
        sleepData: sleepResult.data,
        appointmentsData: appointmentsResult.data,
        isLoading: false,
      })
      
      console.log('✅ Data loaded successfully:', {
        sleepRecords: sleepResult.data.length,
        appointments: appointmentsResult.data.length,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load data'
      set({ error: errorMessage, isLoading: false })
      console.error('❌ Data loading error:', error)
    }
  },
}))
