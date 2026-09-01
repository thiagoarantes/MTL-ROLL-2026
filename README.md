# MTL ROLL 2026 🛼⚡

> **The premier urban night-skating festival in Montreal.**  
> Ride the weekend. Explore Montreal by night on wheels across iconic spots, Formula 1 tracks, street convoys, and roller disco workshops.

🌐 **Production Website:** [https://montrealroll.ca](https://montrealroll.ca)  
💬 **Community Chat:** [Join the WhatsApp Group](https://chat.whatsapp.com/JyyW0HZxQsQDYbLdTaBG4p)

---

## ⚡ Features

- 🗓️ **Interactive Tactical Calendar**
  - Full day-by-day festival schedule (Friday to Sunday) with detailed event times, locations, hosts, and requirements.
  - **Dynamic Multi-Tag Filters**: Speed Skating, Street Rides, Roller Disco, Slalom, Workshops, Downhill, and social rides.
  - **Live Search & Level Filtering**: Quickly find all-levels, intermediate, or advanced sessions.
  - **"My Schedule" Bookmarking**: Save your personalized festival itinerary directly in local browser storage.
  - **Add to Calendar**: One-click integration for Google Calendar and `.ics` file downloads.

- 🗺️ **Festival Sites Map (*Plan des sites*)**
  - Embedded interactive Google Map highlighting Montreal & Verdun skating zones.
  - Key waypoints directory: **Patinoire BBB (Verdun HQ)**, **Circuit Gilles-Villeneuve (F1 Track)**, **Parc du Souvenir (Muster Point)**, and scenic canal routes.
  - Direct 1-click GPS navigation links and STM metro transit instructions with skates.

- 🤝 **Syndicate & Crew Directory**
  - Profiles for organizing crews, collectives, special guests, coaches, and local scene leaders.
  - Official partner and sponsor acknowledgments (SoloInline, LowLife, Rolling Tribes, and community supporters).

- 📖 **Comprehensive FAQ & Code of Conduct**
  - Trilingual guides covering safety gear, skate rentals, free skate loans at the BBB rink, food & water access, and rain contingency plans.
  - Community code of conduct ensuring a safe, inclusive, and welcoming experience for all riders.

- 🌐 **Full Trilingual Localization**
  - Seamless toggle between **English (EN)**, **Français (FR)**, and **Español (ES)** across the entire platform.

- 📊 **Telemetry & Performance**
  - Lightweight web vitals and audience analytics powered by **Vercel Analytics**.

---

## 🛠️ Tech Stack

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Motion](https://motion.dev/)
- **Analytics:** [@vercel/analytics](https://vercel.com/analytics)
- **Server:** [Express](https://expressjs.com/) with TypeScript execution via [tsx](https://github.com/privatenumber/tsx) / [esbuild](https://esbuild.github.io/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/) / [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/montreal-roll-2026.git
   cd montreal-roll-2026
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build & Production

To compile static client assets and bundle the server for production:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

---

## 📁 Project Structure

```
├── public/                 # Static public assets (icons, images, logos)
├── src/
│   ├── components/
│   │   ├── CalendarView.tsx      # Main schedule, filters, search & modals
│   │   ├── SitesMapView.tsx      # Google Maps embed & spot directory
│   │   ├── SyndicateView.tsx     # Crew, organizers, guests & sponsors
│   │   ├── FaqConductView.tsx    # Q&A accordion and code of conduct
│   │   └── TopNavBar.tsx         # Navigation header, language picker, mobile drawer
│   ├── data/
│   │   ├── calendarData.ts       # Festival timetable schedule & event entries
│   │   ├── faqData.ts            # FAQ questions, answers & categories (EN/FR/ES)
│   │   └── index.ts              # Activities, organizers, guests & sponsors
│   ├── types.ts                  # Shared TypeScript interfaces & types
│   ├── App.tsx                   # Main layout container & analytics
│   ├── main.tsx                  # React DOM root entry point
│   └── index.css                 # Tailwind CSS styles & design tokens
├── server.ts               # Express server & Vite middleware
├── package.json            # Scripts & dependencies
└── vite.config.ts          # Vite configuration
```

---

## 👥 Community & Social Links

- **Official Website:** [https://montrealroll.ca](https://montrealroll.ca)
- **WhatsApp Group:** [chat.whatsapp.com/JyyW0HZxQsQDYbLdTaBG4p](https://chat.whatsapp.com/JyyW0HZxQsQDYbLdTaBG4p)
- **Facebook Community:** [facebook.com/groups/rollingtribes](https://www.facebook.com/groups/rollingtribes)
- **Instagram:** [@rollingtribes](https://www.instagram.com/rollingtribes)

---

## 📄 License

© 2026 MTL ROLL. All rights reserved. Organized with the Montreal inline, quad, and urban skating community.
