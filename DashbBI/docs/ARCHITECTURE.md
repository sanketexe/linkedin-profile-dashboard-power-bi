# Technology Stack & Architecture

**Project:** Sleep Health Analytics Dashboard  
**Version:** 1.0  
**Date:** October 27, 2025

---

## 🎯 Stack Selection Summary

### Recommended Stack (Modern & Performant)

| Layer | Technology | Justification |
|-------|------------|---------------|
| **Frontend Framework** | React 18 + TypeScript | Industry standard, rich ecosystem, type safety |
| **Build Tool** | Vite | Fast dev server, optimized builds |
| **Charting Library** | Apache ECharts | Feature-rich, beautiful, Power BI-like visuals |
| **UI Components** | shadcn/ui + Tailwind CSS | Modern, customizable, accessible |
| **State Management** | Zustand | Simple, lightweight, perfect for dashboard filters |
| **Data Processing** | lodash + d3-array | Efficient client-side data manipulation |
| **Routing** | React Router v6 | Multi-page navigation (optional) |
| **Testing** | Vitest + React Testing Library | Fast, modern testing |
| **E2E Testing** | Playwright | Reliable cross-browser testing |
| **Deployment** | Vercel | Zero-config, fast CDN, free tier |

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REACT APPLICATION                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Components Layer                                         │  │
│  │  ├─ Dashboard.tsx (Main layout)                          │  │
│  │  ├─ FilterPanel.tsx (Left sidebar filters)              │  │
│  │  ├─ KPICards.tsx (Top metrics row)                       │  │
│  │  ├─ Charts/                                              │  │
│  │  │   ├─ BarChart.tsx                                     │  │
│  │  │   ├─ LineChart.tsx                                    │  │
│  │  │   ├─ PieChart.tsx                                     │  │
│  │  │   ├─ ScatterPlot.tsx                                  │  │
│  │  │   └─ Heatmap.tsx                                      │  │
│  │  └─ ExportButton.tsx (PNG/PDF export)                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                       │
│                         ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  State Management (Zustand)                              │  │
│  │  ├─ useFilterStore (active filters)                      │  │
│  │  ├─ useDataStore (loaded datasets)                       │  │
│  │  └─ useSelectionStore (cross-filtering state)            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                       │
│                         ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Data Layer (Services)                                    │  │
│  │  ├─ dataLoader.ts (CSV parsing & caching)                │  │
│  │  ├─ dataTransform.ts (filtering, aggregation, joins)     │  │
│  │  ├─ metrics.ts (KPI calculations)                        │  │
│  │  └─ export.ts (chart export logic)                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STATIC DATA FILES                            │
│  ├─ /public/data/sleep_health.csv                             │
│  └─ /public/data/medical_appointments.csv                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 Frontend Technology Details

### 1. React 18 + TypeScript

**Why React?**
- ✅ Most popular UI library (huge ecosystem)
- ✅ Component reusability (charts as components)
- ✅ Excellent performance with hooks & memoization
- ✅ Strong TypeScript support

**Why TypeScript?**
- ✅ Type safety for data schemas
- ✅ Better developer experience (autocomplete)
- ✅ Catches bugs at compile time
- ✅ Self-documenting code

**Alternatives Considered:**
- Vue 3: Great, but smaller ecosystem for charting
- Svelte: Fast, but less mature for complex dashboards
- Vanilla JS: No framework overhead, but harder to maintain

---

### 2. Apache ECharts (Charting Library)

**Why ECharts?**
- ✅ **Visually stunning** (closest to Power BI/Tableau aesthetics)
- ✅ **Rich chart types:** Bar, Line, Pie, Scatter, Heatmap, Gauge, Sankey
- ✅ **Built-in interactions:** Zoom, brush selection, tooltips, legend toggling
- ✅ **Performant:** Handles 10k+ data points smoothly
- ✅ **Theme support:** Easy to customize colors/fonts
- ✅ **React integration:** `echarts-for-react` wrapper

**Example Chart Types:**
- KPI Cards: Custom HTML/CSS
- Bar Chart: `echarts.bar`
- Line Chart: `echarts.line` with area fill
- Pie/Donut: `echarts.pie` with radius adjustment
- Scatter: `echarts.scatter` with color encoding
- Heatmap: `echarts.heatmap` for correlation matrix

**Alternatives Considered:**
- **Plotly.js:** Good, but heavier bundle size
- **Recharts:** React-native, but less feature-rich
- **Chart.js:** Simple, but limited customization
- **D3.js:** Most powerful, but requires manual coding (no pre-built charts)

---

### 3. shadcn/ui + Tailwind CSS

**Why shadcn/ui?**
- ✅ Beautiful, accessible components (buttons, cards, dropdowns)
- ✅ Copy-paste components (no npm dependency bloat)
- ✅ Built on Radix UI (accessibility primitives)
- ✅ Customizable with Tailwind

**Why Tailwind CSS?**
- ✅ Utility-first (rapid prototyping)
- ✅ Consistent design system
- ✅ Small production bundle (purges unused CSS)
- ✅ Easy theming (CSS variables for Power BI colors)

**Alternative:**
- Material UI: Good, but opinionated design (harder to match Power BI look)

---

### 4. Zustand (State Management)

**Why Zustand?**
- ✅ **Simple API:** Less boilerplate than Redux
- ✅ **Perfect for dashboards:** Manages filter state, selections, cross-filtering
- ✅ **Tiny bundle:** 1KB vs Redux 10KB+
- ✅ **TypeScript friendly**

**State Structure:**
```typescript
// Filter state
interface FilterStore {
  filters: {
    gender: string[];
    ageRange: [number, number];
    occupation: string[];
    sleepDisorder: string[];
  };
  setFilter: (key: string, value: any) => void;
  resetFilters: () => void;
}

// Data state
interface DataStore {
  sleepData: SleepHealthRecord[];
  appointmentsData: AppointmentRecord[];
  isLoading: boolean;
  loadData: () => Promise<void>;
}
```

---

## 🛠️ Build & Development Tools

### Vite

**Why Vite?**
- ✅ **Lightning fast dev server** (<1s startup)
- ✅ **Hot Module Replacement (HMR)** (instant updates)
- ✅ **Optimized builds** (code splitting, tree shaking)
- ✅ **TypeScript out of the box**

**Alternative:**
- Create React App: Deprecated, slower
- Next.js: Overkill for static dashboard (no SSR needed)

---

### Package Manager: pnpm (or npm)

**Why pnpm?**
- ✅ Faster installs
- ✅ Disk space efficient
- ✅ Strict dependency resolution

---

## 📊 Data Processing Strategy

### Client-Side Processing (Recommended for this project)

**Why Client-Side?**
- ✅ **Datasets are small** (374 + 850 rows = <1 MB)
- ✅ **Fast interactions** (no server round-trips)
- ✅ **Simple deployment** (static hosting)
- ✅ **Free hosting** (Vercel/Netlify)

**Libraries:**
- **CSV Parsing:** `papaparse` (robust, handles edge cases)
- **Data Manipulation:** `lodash` (groupBy, filter, map) + `d3-array` (mean, median, rollup)
- **Joins:** Custom function or `lodash` merge

**ETL Pipeline:**
```
1. Load CSVs → papaparse → raw arrays
2. Validate → check schema against data contract
3. Transform → parse dates, numbers, categoricals
4. Cache → store in Zustand state
5. Filter/Aggregate → on-demand based on user filters
```

---

## 🎨 Styling & Theming

### Power BI-like Theme

**Color Palette:**
```css
:root {
  /* Primary Blues (Power BI style) */
  --primary-blue: #0078D4;
  --primary-blue-dark: #106EBE;
  --primary-blue-light: #50A0E8;
  
  /* Accent Colors */
  --success-green: #107C10;
  --warning-orange: #FF8C00;
  --danger-red: #D13438;
  
  /* Neutrals */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F3F2F1;
  --bg-card: #FAFAFA;
  --text-primary: #323130;
  --text-secondary: #605E5C;
  --border: #EDEBE9;
  
  /* Chart Colors (Power BI default palette) */
  --chart-1: #0078D4;
  --chart-2: #FFA000;
  --chart-3: #107C10;
  --chart-4: #D13438;
  --chart-5: #8764B8;
  --chart-6: #00B7C3;
}
```

**Typography:**
```css
font-family: 'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

---

## 🧪 Testing Strategy

### Unit Tests (Vitest + React Testing Library)

**What to Test:**
- Data transformation functions (filters, aggregations, joins)
- KPI calculation logic
- Component rendering with different props
- Filter state updates

**Coverage Target:** >80%

---

### E2E Tests (Playwright)

**Critical User Flows:**
1. Dashboard loads with all visuals
2. Apply filter → all charts update
3. Click chart element → cross-filtering works
4. Export chart to PNG → file downloads
5. Reset filters → dashboard returns to initial state

**Test Matrix:**
- Browsers: Chrome, Firefox, Safari (webkit)
- Viewports: Desktop (1920x1080), Tablet (768x1024)

---

### Accessibility Testing

**Tools:**
- `axe-core` (automated a11y checks)
- Manual keyboard navigation testing
- Screen reader testing (NVDA/JAWS)

**WCAG AA Requirements:**
- Color contrast ratios ≥4.5:1
- Keyboard navigable (all interactions)
- ARIA labels on interactive elements
- Focus indicators visible

---

## 🚀 Deployment Architecture

### Static Hosting (Vercel - Recommended)

**Why Vercel?**
- ✅ **Free tier** (perfect for small projects)
- ✅ **Auto-deploy from Git** (push → live in <1 min)
- ✅ **Global CDN** (fast worldwide)
- ✅ **HTTPS by default**
- ✅ **Preview deployments** (for PRs)

**Deployment Flow:**
```
1. Git push to main branch
2. Vercel detects change
3. Runs: npm install → npm run build
4. Deploys to CDN
5. Live URL: https://sleep-health-dashboard.vercel.app
```

**Alternatives:**
- Netlify: Similar to Vercel (also great)
- GitHub Pages: Free, but slower builds
- Azure Static Web Apps: Good for enterprise

---

### Performance Optimizations

**Bundle Size:**
- Code splitting by route (if multi-page)
- Tree shaking (remove unused code)
- Lazy loading charts (load on scroll)
- **Target:** <500KB initial bundle

**Runtime Performance:**
- Memoize chart components (`React.memo`)
- Debounce filter inputs (300ms delay)
- Virtual scrolling for large tables (`react-window`)
- Web Workers for heavy calculations (if needed)

**Caching:**
- Service Worker (cache CSV files)
- LocalStorage (persist filter state)
- CDN caching (static assets)

---

## 🔐 Security Considerations

### Current Scope (Public Dashboard)
- ✅ No authentication required (demo project)
- ✅ No sensitive data (synthetic dataset)
- ✅ HTTPS enforced by Vercel

### Future Enhancements (if needed)
- **Authentication:** Auth0, Clerk, or NextAuth.js
- **RBAC:** Role-based access to specific visuals
- **API Keys:** If backend added for real data
- **CSP Headers:** Content Security Policy for XSS protection

---

## 📁 Project Structure

```
DashbBI/
├── public/
│   ├── data/
│   │   ├── sleep_health.csv
│   │   └── medical_appointments.csv
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── KPICards.tsx
│   │   ├── charts/
│   │   │   ├── BarChart.tsx
│   │   │   ├── LineChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   ├── ScatterPlot.tsx
│   │   │   └── Heatmap.tsx
│   │   └── ui/ (shadcn components)
│   ├── lib/
│   │   ├── dataLoader.ts
│   │   ├── dataTransform.ts
│   │   ├── metrics.ts
│   │   └── utils.ts
│   ├── stores/
│   │   ├── filterStore.ts
│   │   ├── dataStore.ts
│   │   └── selectionStore.ts
│   ├── types/
│   │   ├── sleep-health.types.ts
│   │   └── appointments.types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/
│   ├── unit/
│   │   ├── dataTransform.test.ts
│   │   └── metrics.test.ts
│   └── e2e/
│       └── dashboard.spec.ts
├── docs/
│   ├── PROJECT_BRIEF.md
│   ├── DATA_CONTRACT.md
│   └── ARCHITECTURE.md (this file)
├── etl/
│   └── generate_datasets.py
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 📦 Dependencies (package.json)

### Production Dependencies
```json
{
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "react-router-dom": "^6.20.0",
  "zustand": "^4.4.7",
  "echarts": "^5.4.3",
  "echarts-for-react": "^3.0.2",
  "papaparse": "^5.4.1",
  "lodash": "^4.17.21",
  "d3-array": "^3.2.4",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.1.0"
}
```

### Dev Dependencies
```json
{
  "@vitejs/plugin-react": "^4.2.1",
  "vite": "^5.0.8",
  "typescript": "^5.3.3",
  "vitest": "^1.1.0",
  "@testing-library/react": "^14.1.2",
  "@playwright/test": "^1.40.0",
  "tailwindcss": "^3.4.0",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32",
  "@types/react": "^18.2.45",
  "@types/react-dom": "^18.2.18",
  "@types/papaparse": "^5.3.14",
  "@types/lodash": "^4.14.202"
}
```

---

## 🔄 Alternative Architectures (if needed later)

### Option B: Backend API (for larger datasets)

**When to use:**
- Dataset >100k rows
- Need server-side aggregation
- Real-time data updates
- Authentication required

**Stack:**
- **Backend:** Node.js + Express or Python + FastAPI
- **Database:** PostgreSQL (relational) or MongoDB (document)
- **Caching:** Redis
- **Deployment:** Docker container on Azure/AWS

---

## ✅ Decision Matrix

| Requirement | Solution | Rationale |
|-------------|----------|-----------|
| Fast dev experience | Vite + React | HMR, TypeScript support |
| Power BI-like visuals | ECharts | Rich chart library, beautiful defaults |
| Type safety | TypeScript | Catch errors early, better DX |
| Simple state | Zustand | Lightweight, no Redux boilerplate |
| Modern UI | shadcn/ui + Tailwind | Customizable, accessible |
| Fast deployment | Vercel | Zero-config, auto-deploy |
| Small bundle | Code splitting + tree shaking | <500KB target |
| Accessibility | Radix UI + manual testing | WCAG AA compliance |

---

## 🚀 Next Steps

1. ✅ Stack selection complete
2. **Next:** Initialize Vite + React + TypeScript project
3. **Next:** Set up Tailwind + shadcn/ui
4. **Next:** Build first prototype (3 charts + KPIs)

---

*Last Updated: October 27, 2025*
