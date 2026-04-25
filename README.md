# Raja Travels - Luxury Tourism Portal

A high-end, modern digital platform built for **Raja Travels**, an AP Tourism Authorized Agent. This web application is engineered to provide a premium, luxury user experience for booking bus rentals and regional tour packages like Papikondalu, Maredumilli, and Bhadrachalam.

## 🌟 Key Features

- **Premium Design System:** Bespoke UI strictly adhering to the official Raja Travels brand identity (Royal Blue and Golden Yellow) with soft shadows, glassmorphism, and custom geometric shapes (`brand-shape`) inspired by the logo.
- **Dynamic Booking Engine:** A contextual booking form that adapts to the selected service type, integrated directly with **WhatsApp** and **EmailJS** for instant lead generation.
- **Fluid Animations:** Powered by `framer-motion`, featuring scroll-reveal animations, dynamic button hover states, and smooth UI transitions.
- **Responsive Architecture:** Fully optimized for all devices, featuring a dynamic responsive navigation bar and mobile-first container layouts.
- **SEO & Performance:** Built on Next.js 14+ App Router, utilizing native image optimization, custom metadata, and high-performance server-side rendering architecture.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 18+)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** `react-icons` (FontAwesome)
- **Email Integration:** EmailJS

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### 1. Install Dependencies
Open your terminal, navigate to the project directory, and install the required npm packages:
```bash
npm install
```
*(If you use `yarn` or `pnpm`, run `yarn install` or `pnpm install` respectively).*

### 2. Configure Environment Variables
To enable the EmailJS booking functionality, you need to configure your API keys.
Open `src/lib/constants.ts` and locate the `BUSINESS.emailjs` object:
```typescript
emailjs: {
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
  publicKey: "YOUR_PUBLIC_KEY",
}
```
Replace the placeholder strings with your actual EmailJS dashboard credentials.

### 3. Run the Development Server
Start the Next.js development server:
```bash
npm run dev
```

### 4. View the App
Open your browser and navigate to:
👉 **http://localhost:3000**

You should now see the Raja Travels website running locally! Any changes you make to the code will hot-reload automatically in the browser.

---

## 📦 Building for Production

When you are ready to deploy the website to production (e.g., Vercel, Netlify, or a custom server), run the build command to generate an optimized production bundle:

```bash
npm run build
```

To test the compiled production build locally:
```bash
npm run start
```

---

## 🎨 Design Notes
- **Logo Adjustments:** The layout is specifically tuned for a tightly cropped, high-resolution transparent PNG logo.
- **CSS Globals:** Custom luxury border-radius utilities (`.brand-shape` and `.brand-shape-reverse`) are centrally managed in `src/app/globals.css`.
- **Colors:** The primary brand colors (`primary`: Royal Blue, `gold`: Golden Yellow) are configured globally in `tailwind.config.ts`.

## 📄 License
Copyright © Raja Travels. All rights reserved.
