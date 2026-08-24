# 🌌 Chamathka Ranathunga - Personal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

Welcome to the source code for my personal portfolio! I am **Chamathka Ranathunga**, a Full-Stack Developer and BSc (Hons) IT Undergraduate at the University of Moratuwa, Sri Lanka.

This portfolio is designed to be fully responsive, highly interactive, and features modern UI/UX principles such as glassmorphism, dynamic mesh gradients, and 3D micro-animations.

👉 **[View Live Demo](https://chamathka.dev)** *(Replace with your Vercel URL if you haven't linked the domain yet!)*

---

## ✨ Features

- **Dynamic Animations:** Smooth scroll reveals and 3D tilt hover effects powered by `framer-motion`.
- **Modern Styling:** Built entirely with custom CSS properties, global tokens, and `Tailwind CSS v4` utilities.
- **Dark Theme UI:** Deep navy and teal color palette tailored for an immersive, premium aesthetic.
- **Working Contact Form:** Backend serverless API route handling email dispatch using the **Resend API**.
- **Fully Responsive:** Adapts seamlessly to mobile, tablet, and ultra-wide desktop viewports.
- **SEO Optimized:** Structured semantic HTML and Next.js metadata injected.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS (Custom Design System)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Email Delivery:** Resend SDK
- **Deployment:** Vercel

## 🚀 Running Locally

Want to run this project on your own machine? Follow these steps:

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
Create a `.env.local` file in the root of the project and add your Resend API Key:
```env
RESEND_API_KEY=your_resend_api_key_here
```

### 4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/` - Contains the Next.js App Router layout, page structure, and API routes.
  - `api/contact/route.ts` - Serverless backend for the email contact form.
  - `page.tsx` - The primary single-page portfolio layout with all UI components.
  - `globals.css` - Custom design tokens, glassmorphic styles, and base typography.
- `public/` - Static assets, images, and CV PDF.

## 📬 Contact Me

Feel free to reach out if you have any questions or want to collaborate!
- **Email:** ranathungarjklc.23@uom.lk
- **LinkedIn:** [Chamathka Ranathunga](https://www.linkedin.com/in/chamathka-ranathunga-b19794291/)
- **GitHub:** [@Rjkl003CR](https://github.com/Rjkl003CR)

---
*Designed & Developed with ❤️ by Chamathka Ranathunga*
