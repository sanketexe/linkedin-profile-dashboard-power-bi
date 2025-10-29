# Data Contract - Sleep Health Analytics Dashboard

**Version:** 1.0  
**Date:** October 27, 2025  
**Status:** ✅ Approved

---

## 🎯 Overview

This document defines the structure, relationships, and business rules for the two datasets powering the Sleep Health Analytics Dashboard.

---

## 📊 Dataset 1: Sleep Health & Lifestyle

### Metadata
- **File Path:** `data/sleep_health.csv`
- **Format:** CSV (UTF-8, comma-delimited)
- **Primary Key:** `Person_ID`
- **Total Records:** 374
- **Update Frequency:** Static (for this project)
- **Data Source:** Synthetic (generated for demonstration)

### Schema

| Column Name | Data Type | Format | Nullable | Description | Example Values |
|-------------|-----------|--------|----------|-------------|----------------|
| `Person_ID` | String | P#### | No | Unique person identifier (Primary Key) | P0001, P0234 |
| `Gender` | String | Categorical | No | Biological gender | Male, Female |
| `Age` | Integer | Number | No | Age in years | 27-59 |
| `Occupation` | String | Categorical | No | Current profession | Nurse, Engineer, Teacher |
| `Sleep_Duration` | Float | Decimal(1) | No | Average hours of sleep per night | 5.8-8.5 |
| `Quality_of_Sleep` | Integer | Scale 1-10 | No | Self-reported sleep quality rating | 4-9 |
| `Physical_Activity_Level` | Integer | Minutes/day | No | Daily physical activity duration | 30-90 |
| `Stress_Level` | Integer | Scale 1-10 | No | Self-reported stress level | 3-8 |
| `BMI_Category` | String | Categorical | No | Body Mass Index category | Normal, Overweight, Obese, Normal Weight |
| `Blood_Pressure` | String | Systolic/Diastolic | No | Blood pressure reading | 115/75, 140/95 |
| `Heart_Rate` | Integer | BPM | No | Resting heart rate (beats per minute) | 65-85 |
| `Daily_Steps` | Integer | Steps/day | No | Average daily step count | 3000-10000 |
| `Sleep_Disorder` | String | Categorical | No | Diagnosed sleep disorder | None, Insomnia, Sleep Apnea |

### Value Constraints

**Occupation** (11 categories):
- Nurse, Doctor, Engineer, Lawyer, Teacher, Accountant, Salesperson, Software Engineer, Scientist, Sales Representative, Manager

**BMI_Category** (4 categories):
- Normal, Normal Weight, Overweight, Obese

**Sleep_Disorder** (3 categories):
- None, Insomnia, Sleep Apnea

### Business Rules
1. `Quality_of_Sleep` inversely correlates with `Stress_Level`
2. People with sleep disorders typically have `Quality_of_Sleep` ≤ 6
3. `Sleep_Duration` recommended range: 7-9 hours
4. `Physical_Activity_Level` recommended: ≥60 minutes/day

### Sample Data
```csv
Person_ID,Gender,Age,Occupation,Sleep_Duration,Quality_of_Sleep,Physical_Activity_Level,Stress_Level,BMI_Category,Blood_Pressure,Heart_Rate,Daily_Steps,Sleep_Disorder
P0001,Male,43,Salesperson,7.1,4,33,6,Obese,128/75,83,4070,Insomnia
P0002,Female,52,Teacher,7.5,7,33,7,Normal,132/88,66,4958,None
P0003,Female,34,Salesperson,7.8,5,68,8,Overweight,140/76,73,5501,Insomnia
```

---

## 📊 Dataset 2: Medical Appointments & Interventions

### Metadata
- **File Path:** `data/medical_appointments.csv`
- **Format:** CSV (UTF-8, comma-delimited)
- **Primary Key:** `Appointment_ID`
- **Foreign Key:** `Person_ID` → references Dataset 1
- **Total Records:** 850
- **Unique Patients:** 299 (79.9% of Dataset 1)
- **Date Range:** 2023-10-28 to 2025-10-27 (2 years)
- **Update Frequency:** Static (for this project)

### Schema

| Column Name | Data Type | Format | Nullable | Description | Example Values |
|-------------|-----------|--------|----------|-------------|----------------|
| `Appointment_ID` | String | APT##### | No | Unique appointment identifier (Primary Key) | APT00001, APT00850 |
| `Person_ID` | String | P#### | No | Person identifier (Foreign Key) | P0001, P0234 |
| `Appointment_Date` | String | YYYY-MM-DD | No | Date of medical appointment | 2024-05-15, 2025-10-20 |
| `Doctor_Type` | String | Categorical | No | Medical specialty of provider | Sleep Specialist, Cardiologist |
| `Diagnosis` | String | Categorical | No | Primary diagnosis given | Chronic Insomnia, Preventive Care |
| `Treatment_Prescribed` | String | Categorical | No | Recommended treatment | Medication, CPAP Machine, Therapy |
| `Follow_Up_Required` | String | Yes/No | No | Whether follow-up needed | Yes, No |
| `Appointment_Cost` | Integer | USD ($) | No | Total cost of appointment | 90-350 |
| `Insurance_Coverage` | String | Categorical | No | Insurance coverage level | Full, Partial, None |

### Value Constraints

**Doctor_Type** (5 categories):
- Sleep Specialist, General Practitioner, Cardiologist, Nutritionist, Psychologist

**Diagnosis** (9 categories):
- Chronic Insomnia, Sleep Apnea, Stress-Related Insomnia, Lifestyle Issues, Preventive Care, Stress Management, Lifestyle Counseling, No Issues Found

**Treatment_Prescribed** (8 categories):
- Medication, Cognitive Behavioral Therapy, Lifestyle Changes, Sleep Hygiene Education, CPAP Machine, Exercise Program, Stress Reduction Techniques, None

**Insurance_Coverage** (3 categories):
- Full, Partial, None

### Business Rules
1. People with sleep disorders (Insomnia, Sleep Apnea) are 3x more likely to have appointments
2. `Appointment_Cost` varies by `Doctor_Type`:
   - Sleep Specialist: $220-280
   - General Practitioner: $90-150
   - Cardiologist: $270-330
   - Nutritionist: $120-180
   - Psychologist: $150-210
3. `Follow_Up_Required = Yes` is more common for serious diagnoses (Chronic Insomnia, Sleep Apnea)
4. Each person can have multiple appointments (average: 2.84 per patient)

### Sample Data
```csv
Appointment_ID,Person_ID,Appointment_Date,Doctor_Type,Diagnosis,Treatment_Prescribed,Follow_Up_Required,Appointment_Cost,Insurance_Coverage
APT00559,P0223,2023-10-28,Sleep Specialist,Lifestyle Issues,Medication,No,294,Partial
APT00180,P0346,2023-10-28,Psychologist,Stress Management,None,No,192,Full
APT00522,P0021,2023-10-29,Cardiologist,Lifestyle Issues,Medication,Yes,333,Full
```

---

## 🔗 Dataset Relationships

### Entity Relationship Diagram

```
┌─────────────────────────────────────┐
│   Sleep Health & Lifestyle (1)      │
│   ─────────────────────────────     │
│   Person_ID (PK)                    │
│   Gender                            │
│   Age                               │
│   Occupation                        │
│   Sleep_Duration                    │
│   Quality_of_Sleep                  │
│   Physical_Activity_Level           │
│   Stress_Level                      │
│   BMI_Category                      │
│   Blood_Pressure                    │
│   Heart_Rate                        │
│   Daily_Steps                       │
│   Sleep_Disorder                    │
└──────────────┬──────────────────────┘
               │
               │ Person_ID (FK)
               │ (One-to-Many)
               │
               ▼
┌─────────────────────────────────────┐
│   Medical Appointments (Many)        │
│   ────────────────────────────       │
│   Appointment_ID (PK)                │
│   Person_ID (FK) ───────────────────▶│
│   Appointment_Date                   │
│   Doctor_Type                        │
│   Diagnosis                          │
│   Treatment_Prescribed               │
│   Follow_Up_Required                 │
│   Appointment_Cost                   │
│   Insurance_Coverage                 │
└─────────────────────────────────────┘
```

### Join Logic

**Primary Join:**
```sql
SELECT *
FROM sleep_health s
LEFT JOIN medical_appointments m ON s.Person_ID = m.Person_ID
```

**Use Cases:**
- **Left Join:** Get all people, include appointment data if exists (75 people have no appointments)
- **Inner Join:** Analyze only people with appointments (299 people)
- **Aggregation:** Count appointments per person, sum costs per person

### Referential Integrity
- ✅ All `Person_ID` values in medical_appointments exist in sleep_health
- ✅ 299 out of 374 people (79.9%) have at least one appointment
- ✅ 75 people have no appointments (healthy or not seeking care)
- ⚠️ Some people have multiple appointments (up to 7+)

---

## 📊 Derived Metrics & Calculations

### Health Risk Score
```
Risk_Score = (
  (10 - Quality_of_Sleep) * 0.3 +
  Stress_Level * 0.3 +
  (Sleep_Duration < 7 ? 3 : 0) +
  (Sleep_Disorder != 'None' ? 5 : 0)
)
```
**Interpretation:** Score >8 = High Risk, 5-8 = Medium Risk, <5 = Low Risk

### Total Healthcare Spend (per person)
```
Total_Spend = SUM(Appointment_Cost WHERE Person_ID = X)
```

### Appointment Frequency
```
Appointment_Count = COUNT(Appointment_ID WHERE Person_ID = X)
```

### Insurance Coverage Rate
```
Coverage_Rate = COUNT(Insurance_Coverage IN ('Full', 'Partial')) / COUNT(*) * 100
```

### Sleep Compliance Rate
```
Sleep_Compliance = COUNT(Sleep_Duration BETWEEN 7 AND 9) / COUNT(*) * 100
```

---

## 🧪 Data Quality Rules

### Validation Checks
1. **No duplicate Person_IDs** in sleep_health dataset
2. **No duplicate Appointment_IDs** in medical_appointments dataset
3. **All foreign keys resolve** (Person_ID in appointments exists in sleep_health)
4. **Date range validation** (Appointment_Date between 2023-10-28 and 2025-10-27)
5. **Numeric ranges:**
   - Age: 27-60
   - Sleep_Duration: 5.8-8.5
   - Quality_of_Sleep: 1-10
   - Stress_Level: 1-10
   - Physical_Activity_Level: 30-90
   - Heart_Rate: 65-85
   - Daily_Steps: 3000-10000
   - Appointment_Cost: 90-350

### Missing Value Policy
- **Zero tolerance:** No nulls allowed in any field
- All columns marked as NOT NULL in schema
- Default values not used (explicit values required)

---

## 📈 Statistical Summary

### Dataset 1 Statistics
| Metric | Value |
|--------|-------|
| Total Records | 374 |
| Gender Split | Male: 52%, Female: 48% |
| Age Range | 27-59 years |
| Avg Sleep Quality | 6.54 / 10 |
| Avg Stress Level | 5.53 / 10 |
| Sleep Disorder Rate | 31.6% (118 people) |
| - Insomnia | 18.7% (70 people) |
| - Sleep Apnea | 12.8% (48 people) |

### Dataset 2 Statistics
| Metric | Value |
|--------|-------|
| Total Appointments | 850 |
| Unique Patients | 299 |
| Avg Appointments/Patient | 2.84 |
| Avg Appointment Cost | $199.44 |
| Insurance Coverage | Full: 45%, Partial: 35%, None: 20% |
| Follow-Up Required | 42% of appointments |

---

## 🔄 Data Refresh Process

### Current Setup (Static Data)
1. Data is pre-generated and saved as CSV files
2. No automatic refresh required
3. Dashboard loads data from static CSV files

### Future Enhancement (Optional)
1. **Manual CSV Upload:**
   - Replace CSV files in `data/` folder
   - Ensure schema matches this contract
   - Re-run ETL validation script
   
2. **Automated Pipeline:**
   - Could add Python/Node script to fetch from API/database
   - Transform and validate against this contract
   - Output to CSV or JSON for frontend consumption

---

## 📝 Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-10-27 | Initial data contract creation | System |

---

## ✅ Sign-Off

- [x] Schema validated against generated datasets
- [x] Sample data reviewed
- [x] Business rules documented
- [x] Relationship integrity confirmed
- [x] Statistical summary generated

---

*This data contract serves as the authoritative source of truth for all dashboard development and data processing activities.*
