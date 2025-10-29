# 🚀 Quick Start Guide

**Last Updated:** October 27, 2025

---

## ⚡ TL;DR - Get Running in 5 Minutes

```powershell
# 1. Verify datasets exist
Get-ChildItem data\*.csv

# 2. Install Node.js dependencies (when React app is ready)
npm install

# 3. Start dev server
npm run dev

# 4. Open browser → http://localhost:5173
```

---

## 📋 Prerequisites Checklist

Before starting development, make sure you have:

- [x] **Node.js 18+** installed
  ```powershell
  node --version  # Should be v18.0.0 or higher
  ```

- [x] **npm or pnpm** package manager
  ```powershell
  npm --version   # Should be v9.0.0 or higher
  ```

- [x] **Python 3.8+** (already used for data generation)
  ```powershell
  python --version  # Should be 3.8 or higher
  ```

- [x] **Git** (for version control)
  ```powershell
  git --version
  ```

- [x] **Code Editor** (VS Code recommended)

---

## 📁 Current Project State

### ✅ Completed
```
✓ Datasets generated (2 CSV files in data/ folder)
✓ Documentation complete (4 files in docs/ folder)
✓ Project structure created
✓ Technology stack selected
✓ Roadmap defined
```

### 🔄 In Progress
```
→ React project initialization (next step)
→ First prototype charts (KPI + Bar + Line)
```

### ⏳ Not Started
```
○ Full dashboard implementation
○ Testing suite
○ Deployment
```

---

## 🎯 Your Datasets at a Glance

### Dataset 1: Sleep Health
```
Location: data/sleep_health.csv
Rows: 374 people
Columns: 13 (Person_ID, Gender, Age, Occupation, Sleep_Duration, 
         Quality_of_Sleep, Physical_Activity_Level, Stress_Level,
         BMI_Category, Blood_Pressure, Heart_Rate, Daily_Steps,
         Sleep_Disorder)
Primary Key: Person_ID
```

**Sample Row:**
```
P0001,Male,43,Salesperson,7.1,4,33,6,Obese,128/75,83,4070,Insomnia
```

### Dataset 2: Medical Appointments
```
Location: data/medical_appointments.csv
Rows: 850 appointments
Columns: 9 (Appointment_ID, Person_ID, Appointment_Date, Doctor_Type,
         Diagnosis, Treatment_Prescribed, Follow_Up_Required,
         Appointment_Cost, Insurance_Coverage)
Foreign Key: Person_ID → links to Dataset 1
```

**Sample Row:**
```
APT00559,P0223,2023-10-28,Sleep Specialist,Lifestyle Issues,Medication,No,294,Partial
```

---

## 📊 Quick Data Exploration

### View Dataset Statistics
```powershell
# Count rows in each dataset
(Get-Content data\sleep_health.csv).Count
(Get-Content data\medical_appointments.csv).Count

# View first 5 rows
Get-Content data\sleep_health.csv | Select-Object -First 5

# Search for specific values (e.g., people with Insomnia)
Select-String -Path data\sleep_health.csv -Pattern "Insomnia"

# Count appointments by insurance coverage
Select-String -Path data\medical_appointments.csv -Pattern "Full" | Measure-Object
```

### Verify Relationships
```powershell
# Check unique Person IDs in sleep health dataset
(Get-Content data\sleep_health.csv | Select-Object -Skip 1 | ForEach-Object { $_.Split(',')[0] } | Sort-Object -Unique).Count

# Check unique Person IDs in appointments dataset
(Get-Content data\medical_appointments.csv | Select-Object -Skip 1 | ForEach-Object { $_.Split(',')[1] } | Sort-Object -Unique).Count
```

---

## 🛠️ Next Development Steps

### Step 1: Initialize React Project (I'll do this when you're ready)
```powershell
# Create Vite + React + TypeScript project
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Install additional packages
npm install echarts echarts-for-react zustand papaparse lodash d3-array
npm install -D @types/papaparse @types/lodash tailwindcss autoprefixer postcss
```

### Step 2: Configure Tailwind CSS
```powershell
# Initialize Tailwind
npx tailwindcss init -p

# Add Power BI color theme to tailwind.config.js
```

### Step 3: Install shadcn/ui Components
```powershell
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add components as needed
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add select
```

### Step 4: Build First Prototype
```
Create components:
  src/components/KPICard.tsx
  src/components/BarChart.tsx
  src/components/LineChart.tsx
  src/lib/dataLoader.ts
  src/stores/dataStore.ts
```

---

## 📖 Documentation Guide

### Where to Find Information

**Business Requirements:**
- Read: `docs/PROJECT_BRIEF.md`
- Contains: Goals, KPIs, success criteria, business questions

**Data Schema & Relationships:**
- Read: `docs/DATA_CONTRACT.md`
- Contains: Field definitions, data types, validation rules, sample data

**Technology Decisions:**
- Read: `docs/ARCHITECTURE.md`
- Contains: Tech stack choices, architecture diagram, deployment plan

**Project Overview:**
- Read: `README.md`
- Contains: Getting started, project structure, roadmap

**Setup Summary:**
- Read: `docs/SETUP_SUMMARY.md`
- Contains: What's done, statistics, next steps

---

## 🎨 Design Reference

### Power BI Color Palette (for Tailwind config)
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'bi-blue': '#0078D4',
        'bi-blue-dark': '#106EBE',
        'bi-green': '#107C10',
        'bi-orange': '#FF8C00',
        'bi-red': '#D13438',
        'bi-bg': '#F3F2F1',
        'bi-text': '#323130',
      }
    }
  }
}
```

### Fonts
```css
/* index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
  font-family: 'Segoe UI', Inter, -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## 🧪 Testing Your Setup

### Verify Datasets Loaded Correctly
```javascript
// In browser console after React app runs
import { useDataStore } from './stores/dataStore';
const { sleepData, appointmentsData } = useDataStore.getState();
console.log('Sleep records:', sleepData.length);  // Should be 374
console.log('Appointments:', appointmentsData.length);  // Should be 850
```

---

## 🚨 Common Issues & Solutions

### Issue: "Python not found"
**Solution:**
```powershell
# Install Python from Microsoft Store or python.org
# Then regenerate datasets:
python etl/generate_datasets.py
```

### Issue: "CSV files not found"
**Solution:**
```powershell
# Make sure you're in project root
cd e:\pro\POwerBI\DashbBI

# Regenerate datasets
python etl/generate_datasets.py

# Verify files exist
Get-ChildItem data\*.csv
```

### Issue: "npm install fails"
**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules, package-lock.json

# Reinstall
npm install
```

---

## 📦 Recommended VS Code Extensions

Install these for better development experience:

- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript Importer** - Auto-import TypeScript modules
- **Error Lens** - Inline error highlighting

---

## 🎯 First Session Goals

When you're ready to start coding, aim to complete:

1. ✅ Initialize React + TypeScript + Vite project
2. ✅ Install all dependencies (ECharts, Tailwind, Zustand, etc.)
3. ✅ Configure Tailwind with Power BI colors
4. ✅ Create data loader (CSV → JavaScript objects)
5. ✅ Build 1 KPI card showing "Total People: 374"
6. ✅ Build 1 bar chart showing "Sleep Quality by Occupation"
7. ✅ Test in browser - both visuals render correctly

**Time estimate:** 2-3 hours

---

## 💬 Ready to Start?

**Tell me:**
- "Start building the prototype" → I'll initialize the React project and create the first charts
- "Show me the data first" → I'll analyze the datasets and propose specific visuals
- "Explain the architecture" → I'll walk through the tech stack decisions
- "I want to customize X" → Tell me what you want to change

---

## 📞 Help & Support

**Documentation:**
- Project Brief: `docs/PROJECT_BRIEF.md`
- Data Contract: `docs/DATA_CONTRACT.md`
- Architecture: `docs/ARCHITECTURE.md`

**Quick Commands:**
```powershell
# View dataset stats
python etl/generate_datasets.py

# Start dev server (once React app is set up)
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

---

**🚀 You're all set! Ready when you are.**

---

*Last Updated: October 27, 2025*
