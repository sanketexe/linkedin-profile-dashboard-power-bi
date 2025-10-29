// Sleep Health Dataset Types
export interface SleepHealthRecord {
  Person_ID: string
  Gender: 'Male' | 'Female'
  Age: number
  Occupation: string
  Sleep_Duration: number
  Quality_of_Sleep: number
  Physical_Activity_Level: number
  Stress_Level: number
  BMI_Category: string
  Blood_Pressure: string
  Heart_Rate: number
  Daily_Steps: number
  Sleep_Disorder: 'None' | 'Insomnia' | 'Sleep Apnea'
}

// Medical Appointments Dataset Types
export interface AppointmentRecord {
  Appointment_ID: string
  Person_ID: string
  Appointment_Date: string
  Doctor_Type: string
  Diagnosis: string
  Treatment_Prescribed: string
  Follow_Up_Required: 'Yes' | 'No'
  Appointment_Cost: number
  Insurance_Coverage: 'Full' | 'Partial' | 'None'
}

// Joined/Enriched Types
export interface PersonWithAppointments extends SleepHealthRecord {
  appointments: AppointmentRecord[]
  totalAppointments: number
  totalCost: number
}
