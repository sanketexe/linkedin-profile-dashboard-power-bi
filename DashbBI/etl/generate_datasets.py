"""
Generate synthetic Sleep Health & Medical Appointments datasets with proper relationships.
This script creates two CSV files that can be joined on Person_ID.
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# Set seed for reproducibility
np.random.seed(42)
random.seed(42)

# Configuration
NUM_PEOPLE = 374  # Number of people in sleep health dataset
NUM_APPOINTMENTS = 850  # Number of medical appointments

# ============================================================================
# DATASET 1: Sleep Health & Lifestyle Dataset
# ============================================================================

def generate_sleep_health_dataset():
    """Generate the primary sleep health dataset."""
    
    person_ids = [f"P{str(i).zfill(4)}" for i in range(1, NUM_PEOPLE + 1)]
    
    # Demographics
    genders = np.random.choice(['Male', 'Female'], NUM_PEOPLE, p=[0.52, 0.48])
    ages = np.random.randint(27, 60, NUM_PEOPLE)
    
    occupations = np.random.choice(
        ['Nurse', 'Doctor', 'Engineer', 'Lawyer', 'Teacher', 
         'Accountant', 'Salesperson', 'Software Engineer', 'Scientist', 
         'Sales Representative', 'Manager'],
        NUM_PEOPLE,
        p=[0.12, 0.08, 0.15, 0.09, 0.11, 0.08, 0.10, 0.13, 0.07, 0.04, 0.03]
    )
    
    # Sleep metrics
    sleep_duration = np.round(np.random.uniform(5.8, 8.5, NUM_PEOPLE), 1)
    quality_of_sleep = np.random.randint(4, 10, NUM_PEOPLE)
    
    # Lifestyle metrics
    physical_activity = np.random.randint(30, 90, NUM_PEOPLE)
    stress_level = np.random.randint(3, 9, NUM_PEOPLE)
    daily_steps = np.random.randint(3000, 10000, NUM_PEOPLE)
    
    # Health metrics
    bmi_categories = np.random.choice(
        ['Normal', 'Overweight', 'Obese', 'Normal Weight'],
        NUM_PEOPLE,
        p=[0.35, 0.30, 0.25, 0.10]
    )
    
    # Blood pressure (systolic/diastolic)
    systolic = np.random.randint(115, 142, NUM_PEOPLE)
    diastolic = np.random.randint(75, 95, NUM_PEOPLE)
    blood_pressure = [f"{s}/{d}" for s, d in zip(systolic, diastolic)]
    
    heart_rate = np.random.randint(65, 86, NUM_PEOPLE)
    
    # Sleep disorders (correlated with poor sleep quality and high stress)
    sleep_disorders = []
    for i in range(NUM_PEOPLE):
        if quality_of_sleep[i] <= 5 and stress_level[i] >= 7:
            disorder = np.random.choice(['Insomnia', 'Sleep Apnea'], p=[0.6, 0.4])
        elif quality_of_sleep[i] <= 6:
            disorder = np.random.choice(['None', 'Insomnia'], p=[0.6, 0.4])
        else:
            disorder = np.random.choice(['None', 'Sleep Apnea'], p=[0.85, 0.15])
        sleep_disorders.append(disorder)
    
    # Create DataFrame
    df_sleep = pd.DataFrame({
        'Person_ID': person_ids,
        'Gender': genders,
        'Age': ages,
        'Occupation': occupations,
        'Sleep_Duration': sleep_duration,
        'Quality_of_Sleep': quality_of_sleep,
        'Physical_Activity_Level': physical_activity,
        'Stress_Level': stress_level,
        'BMI_Category': bmi_categories,
        'Blood_Pressure': blood_pressure,
        'Heart_Rate': heart_rate,
        'Daily_Steps': daily_steps,
        'Sleep_Disorder': sleep_disorders
    })
    
    return df_sleep


# ============================================================================
# DATASET 2: Medical Appointments & Interventions
# ============================================================================

def generate_appointments_dataset(df_sleep):
    """Generate medical appointments dataset linked to sleep health dataset."""
    
    appointment_ids = [f"APT{str(i).zfill(5)}" for i in range(1, NUM_APPOINTMENTS + 1)]
    
    # Select random people (some people have multiple appointments, some have none)
    # People with sleep disorders are more likely to have appointments
    person_weights = []
    for _, row in df_sleep.iterrows():
        if row['Sleep_Disorder'] in ['Insomnia', 'Sleep Apnea']:
            weight = 3.0  # 3x more likely to have appointments
        elif row['Stress_Level'] >= 7:
            weight = 2.0  # 2x more likely
        else:
            weight = 1.0
        person_weights.append(weight)
    
    # Normalize weights
    person_weights = np.array(person_weights)
    person_weights = person_weights / person_weights.sum()
    
    # Sample person IDs for appointments
    person_ids_for_appointments = np.random.choice(
        df_sleep['Person_ID'].values,
        NUM_APPOINTMENTS,
        p=person_weights,
        replace=True
    )
    
    # Generate appointment dates (last 2 years)
    start_date = datetime.now() - timedelta(days=730)
    appointment_dates = [
        (start_date + timedelta(days=random.randint(0, 730))).strftime('%Y-%m-%d')
        for _ in range(NUM_APPOINTMENTS)
    ]
    
    # Doctor types
    doctor_types = np.random.choice(
        ['Sleep Specialist', 'General Practitioner', 'Cardiologist', 
         'Nutritionist', 'Psychologist'],
        NUM_APPOINTMENTS,
        p=[0.25, 0.35, 0.15, 0.15, 0.10]
    )
    
    # Diagnoses (correlated with sleep disorders from dataset 1)
    diagnoses = []
    treatments = []
    
    for person_id, doctor_type in zip(person_ids_for_appointments, doctor_types):
        person_data = df_sleep[df_sleep['Person_ID'] == person_id].iloc[0]
        
        if person_data['Sleep_Disorder'] == 'Insomnia':
            diagnosis = np.random.choice(
                ['Chronic Insomnia', 'Stress-Related Insomnia', 'Lifestyle Issues'],
                p=[0.5, 0.3, 0.2]
            )
            treatment = np.random.choice(
                ['Medication', 'Cognitive Behavioral Therapy', 'Lifestyle Changes', 'Sleep Hygiene Education'],
                p=[0.3, 0.3, 0.2, 0.2]
            )
        elif person_data['Sleep_Disorder'] == 'Sleep Apnea':
            diagnosis = 'Sleep Apnea'
            treatment = np.random.choice(
                ['CPAP Machine', 'Lifestyle Changes', 'Surgery Consultation'],
                p=[0.6, 0.3, 0.1]
            )
        else:
            diagnosis = np.random.choice(
                ['Preventive Care', 'Stress Management', 'Lifestyle Counseling', 'No Issues Found'],
                p=[0.3, 0.3, 0.25, 0.15]
            )
            treatment = np.random.choice(
                ['Lifestyle Changes', 'Exercise Program', 'Stress Reduction Techniques', 'None'],
                p=[0.35, 0.25, 0.25, 0.15]
            )
        
        diagnoses.append(diagnosis)
        treatments.append(treatment)
    
    # Follow-up required (more likely if serious diagnosis)
    follow_ups = [
        'Yes' if diag in ['Chronic Insomnia', 'Sleep Apnea', 'Stress-Related Insomnia'] 
        else np.random.choice(['Yes', 'No'], p=[0.3, 0.7])
        for diag in diagnoses
    ]
    
    # Appointment costs
    base_costs = {
        'Sleep Specialist': 250,
        'General Practitioner': 120,
        'Cardiologist': 300,
        'Nutritionist': 150,
        'Psychologist': 180
    }
    
    appointment_costs = [
        base_costs[dt] + np.random.randint(-30, 50)
        for dt in doctor_types
    ]
    
    # Insurance coverage
    insurance_coverage = np.random.choice(
        ['Full', 'Partial', 'None'],
        NUM_APPOINTMENTS,
        p=[0.45, 0.35, 0.20]
    )
    
    # Create DataFrame
    df_appointments = pd.DataFrame({
        'Appointment_ID': appointment_ids,
        'Person_ID': person_ids_for_appointments,
        'Appointment_Date': appointment_dates,
        'Doctor_Type': doctor_types,
        'Diagnosis': diagnoses,
        'Treatment_Prescribed': treatments,
        'Follow_Up_Required': follow_ups,
        'Appointment_Cost': appointment_costs,
        'Insurance_Coverage': insurance_coverage
    })
    
    # Sort by date
    df_appointments = df_appointments.sort_values('Appointment_Date').reset_index(drop=True)
    
    return df_appointments


# ============================================================================
# Main execution
# ============================================================================

if __name__ == "__main__":
    print("🏥 Generating Sleep Health & Medical Appointments Datasets...")
    print("=" * 70)
    
    # Generate datasets
    print("\n📊 Generating Dataset 1: Sleep Health & Lifestyle...")
    df_sleep = generate_sleep_health_dataset()
    print(f"   ✓ Generated {len(df_sleep)} records")
    
    print("\n📊 Generating Dataset 2: Medical Appointments...")
    df_appointments = generate_appointments_dataset(df_sleep)
    print(f"   ✓ Generated {len(df_appointments)} appointments")
    
    # Save to CSV
    print("\n💾 Saving datasets to CSV files...")
    sleep_path = 'data/sleep_health.csv'
    appointments_path = 'data/medical_appointments.csv'
    
    df_sleep.to_csv(sleep_path, index=False)
    df_appointments.to_csv(appointments_path, index=False)
    
    print(f"   ✓ Saved: {sleep_path}")
    print(f"   ✓ Saved: {appointments_path}")
    
    # Display statistics
    print("\n" + "=" * 70)
    print("📈 DATASET STATISTICS")
    print("=" * 70)
    
    print("\n🔹 Sleep Health Dataset:")
    print(f"   Total people: {len(df_sleep)}")
    print(f"   Sleep disorders: {df_sleep['Sleep_Disorder'].value_counts().to_dict()}")
    print(f"   Average sleep quality: {df_sleep['Quality_of_Sleep'].mean():.2f}")
    print(f"   Average stress level: {df_sleep['Stress_Level'].mean():.2f}")
    
    print("\n🔹 Medical Appointments Dataset:")
    print(f"   Total appointments: {len(df_appointments)}")
    print(f"   Unique patients: {df_appointments['Person_ID'].nunique()}")
    print(f"   Average appointments per patient: {len(df_appointments) / df_appointments['Person_ID'].nunique():.2f}")
    print(f"   Date range: {df_appointments['Appointment_Date'].min()} to {df_appointments['Appointment_Date'].max()}")
    print(f"   Average cost: ${df_appointments['Appointment_Cost'].mean():.2f}")
    
    print("\n🔗 Relationship Validation:")
    # Check how many people from sleep dataset have appointments
    people_with_appointments = df_appointments['Person_ID'].unique()
    coverage = (len(people_with_appointments) / len(df_sleep)) * 100
    print(f"   People with appointments: {len(people_with_appointments)} ({coverage:.1f}%)")
    print(f"   People without appointments: {len(df_sleep) - len(people_with_appointments)}")
    
    print("\n" + "=" * 70)
    print("✅ Dataset generation complete!")
    print("=" * 70)
    
    # Display sample data
    print("\n📋 Sample data preview:")
    print("\n🔸 Sleep Health (first 3 rows):")
    print(df_sleep.head(3).to_string(index=False))
    
    print("\n🔸 Medical Appointments (first 3 rows):")
    print(df_appointments.head(3).to_string(index=False))
