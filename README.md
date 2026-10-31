# NOVA DENTAL · Innovatechs concept demo

An original, fictional luxury dental-studio website built with **React, Vite, Tailwind CSS, JavaScript, Framer Motion and Lucide React**. An end-to-end interactive portfolio demonstration designed for client presentations, video walkthroughs and static hosting on Vercel.

> **PORTFOLIO CONCEPT — NOT A REAL CLINIC.** The studio, practitioner names, professional roles, location, services and appointment flow are fictional. Clinic photos are illustrative Unsplash imagery; practitioner portraits are original SVG illustrations. Nothing here constitutes medical advice, guarantees or actual treatment/service offers. It contains no real booking system, no secure patient records, no clinical calendar and no email/SMS integration. Enter **demo data only**.

## Quick start

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the URL shown in the terminal, normally `http://localhost:5173`.

## Tests and production build

```bash
npm test
npm run build
npm run preview
```

The build produces `dist/`. This project includes `vercel.json` for Vite routing, with the output directory set to `dist`.

### Deploy on Vercel

1. Push this folder into a GitHub repository (or import the folder via Vercel CLI).
2. Create a Vercel project pointing at the repository.
3. Use **Framework: Vite**, **Build Command: `npm run build`**, **Output: `dist`**.
4. No API keys, environment variables, database or paid services are necessary.
5. Verify remote images and typography load on your deployed site.

**Verification status:** Static source checks and Node business-logic tests can run without npm packages. The project has **not** had its Vite production build or interactive browser flow validated in this environment because the npm registry cannot be reached and dependencies are not cached. Run `npm install && npm run build` on a machine with registry access before advertising it as production-build-verified.

## Source structure

```text
nova-dental/
├── index.html
├── package.json
├── tailwind.config.cjs
├── postcss.config.cjs
├── vite.config.js
├── vercel.json
├── public/
│   ├── favicon.svg
│   ├── portrait-salma.svg
│   ├── portrait-youssef.svg
│   └── portrait-lina.svg
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── data/clinic.js
│   ├── lib/appointments.js
│   └── components/
│       ├── Primitives.jsx
│       ├── Header.jsx
│       ├── Services.jsx
│       ├── Team.jsx
│       ├── AppointmentWizard.jsx
│       ├── FAQ.jsx
│       ├── ReceptionDashboard.jsx
│       └── Footer.jsx
├── tests/appointments.test.js
├── IMAGE_CREDITS.md
└── README.md
```

## Working interactions

- Sticky navigation, mobile drawer and smooth section scrolling.
- Expandable service details and context-aware appointment shortcuts.
- Three fictional practitioner profile cards with selectable example practitioner.
- Five-stage appointment wizard: service → practitioner → future date and time preference → example contact information and local-demo acknowledgement → review.
- Multi-step validation, descriptive errors, browser-local date handling, no past dates, phone/email validation.
- Local save confirmation **only after localStorage write succeeds**. No booking, delivery, real availability or notification is claimed.
- Receptionist mini dashboard: live list, keyword search, status filters, local status management, delete with confirmation, JSON export, fresh empty state and error handling.
- Accessible FAQ accordion, focus indicators and reduced motion CSS.
- Remote Unsplash photo assets with designed offline/error fallbacks.

## Demo data model and privacy

Storage key: `innovatechs_nova_dental_requests_v1` in the browser's localStorage.

Each request contains a demo identifier, sample name/email/optional phone, selected service/practitioner, **preferred** date/time, demo status and creation timestamp. No medical-history, symptoms, diagnoses, notes, or clinical information fields exist. All demo requests start in **New**. The demo statuses **New / Reviewing / Closed** describe an illustrative local workflow — **none mean a clinical appointment is booked or confirmed**.

The demo does not transmit data, request calendar availability or process real patient information. Local storage is **not secure for healthcare data**. Never enter real patient or sensitive personal information. Clear your browser's site data or use the dashboard delete controls to remove examples. Storage failure is reported rather than falsely indicating that a request was saved.

## Editorial direction

Warm ivory / muted sage / mineral teal / natural beige; high-contrast editorial serif headlines paired with modern sans-serif typography, quiet architectural imagery, rounded arches, expressive white space and deliberate motion. The project is intended as a showcase, not a medical marketing claim.

## Photography

Image credits, sources and licensing notes: [`IMAGE_CREDITS.md`](./IMAGE_CREDITS.md). Photography is remotely loaded from `images.unsplash.com`; internet access is needed for the real photos. Practitioner portraits are bundled, handcrafted SVG assets.

## Before a real clinic launch

Replace fictional company details with verified, consented content; obtain appropriate image/model/property rights, review jurisdiction-specific healthcare advertising and privacy requirements; add secure encrypted server-side patient/request handling, lawful consent, appropriate data retention, spam/rate limiting and real clinic scheduling; configure actual contact/location data and delivery; perform accessibility testing and full browser E2E testing.
# novaDental
