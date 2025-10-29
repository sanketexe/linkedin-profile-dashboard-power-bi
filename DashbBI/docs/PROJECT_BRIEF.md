# Sleep Health Analytics Dashboard - Project Brief

**Project Name:** Sleep Health BI Dashboard  
**Version:** 1.0  
**Date:** October 27, 2025  
**Project Type:** Business Intelligence Web Dashboard

---

## 🎯 Executive Summary

Build a professional, interactive web-based BI dashboard (mimicking Power BI/Tableau aesthetics and functionality) to analyze sleep health patterns and medical intervention effectiveness using two related datasets:
- **Sleep Health & Lifestyle** (374 people)
- **Medical Appointments & Interventions** (850 appointments)

---

## 📊 Business Goals

### Primary Objectives
1. **Identify sleep health risk factors** - Understand which demographics and lifestyle factors correlate with poor sleep quality and sleep disorders
2. **Analyze medical intervention patterns** - Track appointment frequency, costs, and treatment approaches
3. **Measure healthcare effectiveness** - Assess treatment outcomes and resource allocation
4. **Support preventive care decisions** - Enable stakeholders to identify at-risk populations

### Target Users
- **Health administrators** - Resource planning and cost analysis
- **Medical practitioners** - Patient trend analysis and treatment effectiveness
- **Researchers** - Correlation studies between lifestyle and sleep health
- **Policy makers** - Population health insights for program development

---

## 🔑 Key Performance Indicators (KPIs)

### Health Metrics
- **Average Sleep Quality Score** (target: >7.0/10)
- **Sleep Disorder Prevalence Rate** (%)
- **Average Stress Level** (lower is better)
- **Sleep Duration Compliance** (% getting 7-9 hours)

### Medical & Cost Metrics
- **Total Appointments YTD**
- **Average Cost per Appointment** ($)
- **Insurance Coverage Rate** (% with full/partial coverage)
- **Follow-Up Compliance Rate** (%)

### Derived Metrics
- **Treatment Success Rate** (improvement in sleep quality post-appointment)
- **Cost per Disorder Type** (total spend by diagnosis)
- **High-Risk Population Size** (poor sleep + high stress + disorder)

---

## 📈 Core Dashboard Features

### 1. Filters Panel (Left Sidebar - Power BI style)
- **Demographics:** Gender, Age Range, Occupation
- **Health:** BMI Category, Sleep Disorder Type
- **Medical:** Doctor Type, Insurance Coverage
- **Time:** Appointment Date Range

### 2. KPI Cards (Top Row)
- Total People Analyzed
- Average Sleep Quality
- Total Appointments
- Average Appointment Cost
- Sleep Disorder Rate

### 3. Visualizations

**Sleep Health Analysis**
- 📊 **Bar Chart:** Sleep Quality by Occupation
- 📈 **Line Chart:** Sleep Quality Distribution (histogram)
- 🥧 **Donut Chart:** Sleep Disorder Distribution
- 🔥 **Heatmap:** Correlation Matrix (Sleep Duration vs. Quality vs. Stress)
- 📊 **Bar Chart:** BMI Category Distribution

**Medical Interventions**
- 📈 **Time Series:** Appointments Over Time (monthly trend)
- 📊 **Bar Chart:** Appointments by Doctor Type
- 📊 **Stacked Bar:** Treatment Types by Diagnosis
- 💰 **Bar Chart:** Average Cost by Doctor Type
- 🥧 **Pie Chart:** Insurance Coverage Breakdown

**Cross-Dataset Insights**
- 🔵 **Scatter Plot:** Sleep Quality vs. Number of Appointments (colored by disorder)
- 📊 **Grouped Bar:** Appointment Frequency by Sleep Disorder
- 📈 **Line Chart:** Average Cost by Age Group
- 📊 **Table:** Top 10 High-Risk Patients (drill-through enabled)

### 4. Interactivity Features
- ✅ **Cross-filtering** - Clicking any visual filters all others
- ✅ **Drill-through** - Click person/occupation to see details
- ✅ **Tooltips** - Rich hover information on all data points
- ✅ **Bookmarks** - Save and share filter states via URL
- ✅ **Export** - Download visuals as PNG/PDF
- ✅ **Responsive** - Desktop and tablet optimized

---

## 🗂️ Dataset Overview

### Dataset 1: Sleep Health & Lifestyle
- **File:** `data/sleep_health.csv`
- **Records:** 374 people
- **Primary Key:** `Person_ID`
- **Columns:** 13 (demographics, sleep metrics, lifestyle, health indicators)

### Dataset 2: Medical Appointments
- **File:** `data/medical_appointments.csv`
- **Records:** 850 appointments
- **Primary Key:** `Appointment_ID`
- **Foreign Key:** `Person_ID` → links to Dataset 1
- **Columns:** 9 (appointment details, diagnosis, treatment, costs)

### Relationship
```
Sleep Health (1) ←→ (Many) Medical Appointments
   Person_ID    ←→    Person_ID
```

**Coverage:** 79.9% of people have at least one appointment, average 2.84 appointments per patient

---

## ✅ Success Criteria

### Functional Requirements
- [ ] All KPIs display correctly and update with filters
- [ ] Cross-filtering works across all visuals
- [ ] Dashboard loads and responds in <2 seconds for typical interactions
- [ ] Visuals match Power BI/Tableau aesthetic (colors, spacing, fonts)
- [ ] Mobile/tablet responsive layout
- [ ] Export functionality works (PNG/PDF)

### Technical Requirements
- [ ] Clean, maintainable codebase (TypeScript preferred)
- [ ] Unit tests for data transformations (>80% coverage)
- [ ] E2E tests for core user flows
- [ ] Accessible (WCAG AA compliant)
- [ ] Deployable to static hosting (Vercel/Netlify)

### Business Requirements
- [ ] Stakeholders can answer all business questions from KPIs section
- [ ] Dashboard can be updated with new data via CSV upload
- [ ] Documentation enables handoff to maintenance team

---

## 📅 Key Milestones

| Phase | Deliverable | Target |
|-------|-------------|--------|
| 1 | Requirements & data contract | ✅ Complete |
| 2 | Stack selection & architecture | Week 1 |
| 3 | Visual prototype (3 charts + KPIs) | Week 1 |
| 4 | Full dashboard implementation | Week 2-3 |
| 5 | Testing & QA | Week 3 |
| 6 | Deployment & handoff | Week 4 |

---

## 🎨 Design Requirements

### Visual Style (Power BI/Tableau-like)
- **Color Palette:**
  - Primary: Blues (#0078D4, #106EBE)
  - Success: Green (#107C10)
  - Warning: Orange (#FF8C00)
  - Danger: Red (#D13438)
  - Neutral: Grays (#F3F2F1, #8A8886, #323130)

- **Typography:**
  - Headers: Segoe UI / Inter (bold, 18-24px)
  - Body: Segoe UI / Inter (regular, 14px)
  - KPIs: Large numbers (32-48px)

- **Layout:**
  - Left filter panel (250px width, collapsible)
  - Top KPI row (120px height)
  - Grid of visuals (responsive, 2-3 columns)
  - White/light gray background
  - Card shadows for depth

---

## 🔧 Technical Constraints

- **Browser Support:** Modern browsers (Chrome, Edge, Firefox, Safari - last 2 versions)
- **Dataset Size:** Optimized for <10k rows per dataset (current size well within limits)
- **Hosting:** Static site deployment preferred (no server required unless API needed)
- **Authentication:** Not required for initial version (can add later if needed)
- **Real-time Updates:** Not required (batch data refresh via CSV upload)

---

## 📝 Business Questions to Answer

1. Which occupations have the poorest sleep quality?
2. What is the correlation between stress levels and sleep disorders?
3. How much does the average person spend on sleep-related healthcare?
4. Which treatments are most commonly prescribed for insomnia vs. sleep apnea?
5. Do people with sleep disorders have significantly more medical appointments?
6. What percentage of appointment costs are covered by insurance?
7. Which age groups are most at risk for sleep disorders?
8. Is there a relationship between physical activity levels and sleep quality?
9. What are the most common diagnoses among high-stress occupations?
10. How has appointment volume trended over the past 2 years?

---

## 🚀 Next Steps

1. ✅ **Complete:** Dataset generation and validation
2. ✅ **Complete:** Project brief documentation
3. **In Progress:** Data contract creation
4. **Next:** Stack architecture selection
5. **Next:** Visual prototype development

---

## 📞 Stakeholders

- **Project Owner:** [Your Name]
- **Development Team:** [To be assigned]
- **Target Deployment:** Web (Vercel/Netlify or similar)
- **Review Cycle:** Weekly progress updates

---

*Last Updated: October 27, 2025*
