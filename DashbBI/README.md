# 🏥 Sleep Health Analytics Dashboard

> A professional, Power BI/Tableau-style business intelligence dashboard built with React, TypeScript, and Apache ECharts. Analyzes sleep health patterns and medical interventions using two related datasets.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📊 Project Overview

This project demonstrates a fully-featured, interactive BI dashboard that mimics the look, feel, and functionality of Power BI and Tableau. It analyzes sleep health data and medical appointment patterns to provide actionable insights for healthcare administrators, practitioners, and researchers.

### Key Features

✨ **Power BI/Tableau-like Interface**
- Professional layout with filter panel, KPI cards, and responsive chart grid
- Cross-filtering across all visualizations
- Drill-through capabilities and rich tooltips
- Bookmark and state persistence via URL parameters
- Export charts to PNG/PDF

📊 **Rich Visualizations**
- KPI Cards (metrics dashboard)
- Bar Charts (categorical comparisons)
- Line Charts (time series trends)
- Pie/Donut Charts (proportions)
- Scatter Plots (correlations)
- Heatmaps (correlation matrices)

🔗 **Multi-Dataset Analysis**
- Two related datasets with proper foreign key relationships
- Dynamic joins and aggregations
- Cross-dataset filtering and insights

🚀 **Modern Tech Stack**
- React 18 + TypeScript
- Apache ECharts (beautiful, performant charts)
- Tailwind CSS + shadcn/ui (Power BI-inspired theme)
- Zustand (state management)
- Vite (blazing fast builds)

---

## 📁 Project Structure

```
DashbBI/
├── data/                          # CSV datasets
│   ├── sleep_health.csv          # 374 people, sleep & lifestyle metrics
│   └── medical_appointments.csv  # 850 appointments, treatments & costs
├── docs/                          # Documentation
│   ├── PROJECT_BRIEF.md          # Business goals, KPIs, success criteria
│   ├── DATA_CONTRACT.md          # Schema, relationships, business rules
│   └── ARCHITECTURE.md           # Tech stack, architecture decisions
├── etl/                           # Data generation scripts
│   └── generate_datasets.py      # Python script to generate synthetic data
├── src/                           # Source code (to be created)
│   ├── components/               # React components
│   ├── lib/                      # Data processing utilities
│   ├── stores/                   # Zustand state stores
│   └── types/                    # TypeScript type definitions
├── public/                        # Static assets
├── tests/                         # Unit & E2E tests
└── README.md                     # This file
```

---

## 🎯 Business Questions Answered

This dashboard helps answer critical questions like:

1. **Which occupations have the poorest sleep quality?**
2. **What is the correlation between stress levels and sleep disorders?**
3. **How much does the average person spend on sleep-related healthcare?**
4. **Which treatments are most effective for insomnia vs. sleep apnea?**
5. **Do people with sleep disorders have more medical appointments?**
6. **What percentage of appointment costs are covered by insurance?**
7. **Which age groups are most at risk for sleep disorders?**
8. **Is there a relationship between physical activity and sleep quality?**

---

## 📊 Datasets

### Dataset 1: Sleep Health & Lifestyle
- **Records:** 374 people
- **Key:** `Person_ID` (primary key)
- **Columns:** 13 (demographics, sleep metrics, lifestyle, health indicators)
- **Sample fields:**
  - Demographics: Gender, Age, Occupation
  - Sleep: Duration, Quality, Disorder Type
  - Lifestyle: Physical Activity, Daily Steps, Stress Level
  - Health: BMI, Blood Pressure, Heart Rate

### Dataset 2: Medical Appointments & Interventions
- **Records:** 850 appointments
- **Key:** `Appointment_ID` (primary key)
- **Foreign Key:** `Person_ID` → links to Dataset 1
- **Columns:** 9 (appointment details, diagnosis, treatment, costs)
- **Sample fields:**
  - Appointment: Date, Doctor Type
  - Medical: Diagnosis, Treatment Prescribed
  - Financial: Cost, Insurance Coverage, Follow-up Required

### Relationship
```
Sleep Health (1) ←→ (Many) Medical Appointments
   Person_ID    ←→    Person_ID
```

**Coverage:** 79.9% of people (299/374) have at least one appointment, averaging 2.84 appointments per patient.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/pnpm
- **Python** 3.8+ (for data generation script)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd DashbBI
   ```

2. **Generate the datasets:**
   ```bash
   python etl/generate_datasets.py
   ```
   This creates `data/sleep_health.csv` and `data/medical_appointments.csv`

3. **Install frontend dependencies (once React app is set up):**
   ```bash
   npm install
   # or
   pnpm install
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   Navigate to `http://localhost:5173`

---

## 🎨 Design & UX

### Power BI-Inspired Theme

**Color Palette:**
- Primary Blue: `#0078D4` (Microsoft/Power BI brand)
- Accent Colors: Green `#107C10`, Orange `#FF8C00`, Red `#D13438`
- Neutrals: White `#FFFFFF`, Light Gray `#F3F2F1`, Dark Gray `#323130`

**Typography:**
- Font Family: Segoe UI, Inter, system fonts
- Headings: Bold, 18-24px
- Body: Regular, 14px
- KPIs: Extra large, 32-48px

**Layout:**
- Left sidebar: Filters panel (250px, collapsible)
- Top row: KPI cards (120px height)
- Main grid: Charts (responsive, 2-3 columns)
- Card-based design with subtle shadows

---

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

Tests data transformation functions, KPI calculations, and component rendering.

### E2E Tests
```bash
npm run test:e2e
```

Tests critical user flows: filtering, cross-filtering, drill-through, export.

### Coverage Target
- **Unit tests:** >80% coverage
- **E2E tests:** All critical user flows

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration

3. **Deploy:**
   - Auto-deploys on every push to `main`
   - Preview deployments for PRs
   - Live URL: `https://your-project.vercel.app`

### Alternative: Netlify, GitHub Pages, Azure Static Web Apps

---

## 📚 Documentation

- **[Project Brief](docs/PROJECT_BRIEF.md)** - Business goals, KPIs, success criteria
- **[Data Contract](docs/DATA_CONTRACT.md)** - Schema, relationships, validation rules
- **[Architecture](docs/ARCHITECTURE.md)** - Tech stack, design decisions, deployment

---

## 🛣️ Roadmap

### Phase 1: Foundation ✅
- [x] Dataset generation
- [x] Project structure
- [x] Documentation (brief, data contract, architecture)

### Phase 2: Prototype (Week 1)
- [ ] Initialize React + TypeScript + Vite project
- [ ] Set up Tailwind + shadcn/ui
- [ ] Build 3 prototype charts (bar, line, KPI card)
- [ ] Implement basic cross-filtering

### Phase 3: Full Implementation (Week 2-3)
- [ ] Complete all chart types
- [ ] Filter panel with all dimensions
- [ ] Cross-dataset joins and aggregations
- [ ] Export functionality (PNG/PDF)
- [ ] Responsive layout (desktop + tablet)

### Phase 4: Polish & Deploy (Week 3-4)
- [ ] Performance optimization (<200ms interactions)
- [ ] Accessibility (WCAG AA)
- [ ] Unit & E2E tests
- [ ] Deploy to Vercel
- [ ] User testing & feedback

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Project Owner:** [Your Name]  
**Email:** [your.email@example.com]  
**GitHub:** [github.com/yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- **ECharts** - Powerful charting library
- **shadcn/ui** - Beautiful UI components
- **Vercel** - Seamless deployment platform
- **Kaggle** - Inspiration for synthetic dataset design

---

**Last Updated:** October 27, 2025

---

## 📸 Screenshots (Coming Soon)

_Dashboard screenshots will be added after prototype completion._

---

## 💡 Tips for Developers

### Running the Data Generator
```bash
cd DashbBI
python etl/generate_datasets.py
```

### Viewing Generated Data
```bash
# View first 10 rows of sleep health data
head -n 10 data/sleep_health.csv

# View appointment data statistics
wc -l data/medical_appointments.csv
```

### Development Workflow
1. Make changes in `src/`
2. Vite HMR updates browser instantly
3. Run tests: `npm run test`
4. Build for production: `npm run build`
5. Preview build: `npm run preview`

---

**Ready to build an amazing BI dashboard? Let's go! 🚀**
