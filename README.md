# 🌌 Chamathka Ranathunga - Personal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Sanity CMS](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Welcome to the source code for my personal portfolio! I am **Chamathka Ranathunga**, a Full-Stack Developer and BSc (Hons) IT Undergraduate at the University of Moratuwa, Sri Lanka.

This portfolio is fully responsive, highly interactive, and features a modern UI with glassmorphism, dynamic animations, and full **Progressive Web App (PWA)** capabilities. All content is managed dynamically via a headless **Sanity CMS**.

👉 **[View Live Demo](https://chamathka.dev)** *(Replace with your Vercel URL!)*

---

## ✨ Features

- **Sanity CMS Integration:** All content (Projects, Skills, Certifications, etc.) is fetched dynamically from Sanity Studio.
- **PWA Support:** Installable on mobile and desktop with offline support and caching via `@serwist/next`.
- **Dynamic Animations:** Smooth scroll reveals and 3D hover effects powered by `framer-motion`.
- **Working Contact Form:** Serverless API route handling email dispatch using the **Resend API**.
- **Modern Styling:** Built with Custom CSS, Global Tokens, and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **CMS:** [Sanity](https://www.sanity.io/) (Headless Content Management)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Email Delivery:** Resend SDK
- **PWA:** Serwist

## 🚀 Running Locally

Follow these steps to run the project on your own machine:

### 1. Clone the repository
```bash
git clone https://github.com/Rjkl003CR/my-portfolio.git
cd my-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add your keys:
```env
# Email API
RESEND_API_KEY=your_resend_api_key

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio.
To access the Sanity CMS Studio to edit content, navigate to [http://localhost:3000/studio](http://localhost:3000/studio).

*(Note: PWA offline caching is intentionally disabled in development. To test the PWA locally, run `npm run build` then `npm run start`)*.

## 📬 Contact Me

Feel free to reach out if you have any questions or want to collaborate!
- **Email:** ranathungarjklc.23@uom.lk
- **LinkedIn:** [Chamathka Ranathunga](https://www.linkedin.com/in/chamathka-ranathunga-b19794291/)
- **GitHub:** [@Rjkl003CR](https://github.com/Rjkl003CR)

---
*Designed & Developed with ❤️ by Chamathka Ranathunga*
