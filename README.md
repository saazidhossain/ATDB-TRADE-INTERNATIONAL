<div align="center">

<img src="https://atdbfinal.lovable.app/assets/atdb-logo-dark-CMkcsUAi.webp" alt="ATDB Trade International" width="180"/>

# ATDB Trade International
### Bangladesh's Premier Heavy Equipment Rental Partner

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-atdbtrade.com-FF6B00?style=for-the-badge)](https://www.atdbtrade.com)
[![Built With](https://img.shields.io/badge/Built_With-React_+_Vite-61DAFB?style=for-the-badge&logo=react)](https://vitejs.dev)
[![Routing](https://img.shields.io/badge/Routing-TanStack_Router-FF4154?style=for-the-badge)](https://tanstack.com/router)
[![Styling](https://img.shields.io/badge/Styling-Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-All_Rights_Reserved-1a1a1a?style=for-the-badge)](./LICENSE)

---

*Cranes · Road Rollers · Excavators · Support Equipment*
*A certified, government-compliant fleet ready for your next project.*

**Since 2000 · Dhaka & Tangail, Bangladesh**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Build & Deploy](#-build--deploy)
- [Equipment Fleet](#-equipment-fleet)
- [Design Credits](#-design-credits)
- [Contact](#-contact)

---

## 🏗️ Overview

**ATDB Trade International** is a full-stack marketing and equipment-rental website for Bangladesh's most trusted heavy equipment rental company. Built as a blazing-fast Single Page Application (SPA) with server-side rendering support, it showcases ATDB's certified fleet of 30+ machines across cranes, road rollers, excavators, loaders, and support equipment.

The site features a **bilingual (EN / বাং)** interface, PDF quote generation, WhatsApp-first CTA flows, and a fully responsive design optimized for field engineers on mobile.

| Metric | Value |
|--------|-------|
| 🗓️ Company Founded | 2000 |
| 🏗️ Years in Operation | 26+ |
| 🚧 Equipment Units | 30+ |
| 👷 Skilled Staff | 25 |
| 📍 Office Locations | 2 (Dhaka & Tangail) |

---

## 🌐 Live Demo

| Environment | URL |
|-------------|-----|
| 🟢 Production | [www.atdbtrade.com](https://www.atdbtrade.com) |
| 🔵 Staging (Lovable) | [atdbfinal.lovable.app](https://atdbfinal.lovable.app) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Routing** | TanStack Router (file-based) |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui + Radix UI |
| **Internationalization** | Custom i18n (EN / বাং) |
| **PDF Generation** | jsPDF (spec sheets) |
| **State Management** | React Context (Cart + i18n) |
| **Icons** | Lucide React |
| **Deployment** | Static SPA (Apache/Nginx) |

---

## ✨ Features

- **🏠 Homepage** — Hero banner, equipment categories, featured fleet, project highlights
- **🚜 Equipment Catalogue** — Filterable by category with detailed spec pages
- **📄 PDF Spec Sheets** — Download professional A4 equipment spec sheets in EN or বাং
- **📁 Projects Showcase** — 6 landmark builds across mega-infrastructure & industrial sectors
- **📞 Contact Page** — Office map, WhatsApp CTA, email form
- **🌐 Bilingual** — Full English & Bengali language toggle
- **🛒 Quote Cart** — Multi-item quote builder with WhatsApp dispatch
- **📱 Mobile-First** — Responsive design, tested on all screen sizes
- **🔍 SEO Optimised** — Structured data (JSON-LD), Open Graph, sitemap.xml, robots.txt
- **⚡ Performance** — Lazy loaded images, asset hashing, code splitting

---

## 📁 Project Structure

```
atdbfinal/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/           # Brand logos, equipment photos, project images
│   ├── components/       # Shared UI components (Header, Footer, Cards...)
│   ├── lib/
│   │   ├── atdb-data.ts  # Equipment fleet data, company info
│   │   ├── i18n.tsx      # Bilingual string management
│   │   └── cart.tsx      # Quote cart context
│   ├── pdf/              # jsPDF spec sheet renderer (header, specs-table, footer)
│   ├── routes/           # TanStack Router file-based routes
│   │   ├── __root.tsx    # Root layout, SEO meta, JSON-LD
│   │   ├── index.tsx     # Homepage
│   │   ├── equipment/    # Equipment catalogue + detail pages
│   │   ├── projects.tsx  # Projects showcase
│   │   ├── about.tsx     # Company about
│   │   └── contact.tsx   # Contact page
│   ├── styles.css        # Tailwind base + custom design tokens
│   └── entry.tsx         # App entry point
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/saazidhossain/atdbfinal.git
cd atdbfinal

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Deploy to Apache Hosting

1. Upload all contents of `dist/` to your `public_html/` folder.
2. Create a `.htaccess` file in `public_html/` for SPA routing:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]
```

> ⚠️ The `.htaccess` file is **required**. Without it, direct URL access to pages like `/equipment` or `/about` will return 404.

---

## 🚧 Equipment Fleet

| Category | Units | Brands |
|----------|-------|--------|
| 🏗️ Mobile Cranes | 7 | Liebherr, Kato |
| 🛣️ Road Rollers | 9 | Sakai, Dynapac, Bomag |
| ⛏️ Excavators & Compactors | 3 | CAT, Komatsu |
| 🔩 Loaders & Backhoes | 3 | CASE, XCMG, JCB |
| ⚙️ Support Equipment | — | Generators, TATA Trucks, Compactors |

**Capacity range:** 1 Ton — 120 Ton · **Origins:** Germany, Japan, Italy, China

---

## 🎨 Design Credits

This website was designed and developed by:

**[A SAZID HOSSAIN ARCHITECTURE](https://behance.net/saazidhossain)**
*Sazid Hossain — Architect, Creative Technologist & Web Strategist*

[![Behance](https://img.shields.io/badge/Behance-@saazidhossain-1769FF?style=flat-square&logo=behance)](https://behance.net/saazidhossain)
[![GitHub](https://img.shields.io/badge/GitHub-@saazidhossain-181717?style=flat-square&logo=github)](https://github.com/saazidhossain)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-saazidhossain-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/saazidhossain)

---

## 📞 Contact

**M/S ATDB Trade International**

| | |
|-|-|
| 📱 Phone / WhatsApp | [+880 1712-106242](https://wa.me/8801712106242) |
| 📧 Email | [saifulaapi@gmail.com](mailto:saifulaapi@gmail.com) |
| 🏢 Corporate Office | House #319 (8F), Lane #8, East Kazi Para, Kafrul, Dhaka-1216 |
| 🏢 Branch Office | House #311 (2F), Boro Kalibari Road, Tangail-1900 |
| 🌐 Website | [www.atdbtrade.com](https://www.atdbtrade.com) |
| 📘 Facebook | [facebook.com/ATDB](https://www.facebook.com/share/1HzpUFqjko/) |

---

<div align="center">

© M/S ATDB Trade International. All rights reserved.

*Designed & built by [A SAZID HOSSAIN ARCHITECTURE](https://behance.net/saazidhossain)*

</div>
