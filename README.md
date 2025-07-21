# Rephrase-AI | Convert lengthy PDFs into smart, concise summaries.

This repository contains the source code for my rephrase- ai website, built from the ground up with a modern, professional tech stack to showcase my skills and projects.

**Live Site**: [rephrase-ai-xvug.vercel.app](https://rephrase-ai-xvug.vercel.app/)

##  Features

- **Fully Responsive Design**  
  A clean, professional, and mobile-first user interface that looks great on all devices.

- **Stripe Integration**  
  Seamless and secure payment handling using Stripe. Supports transactions with real-time webhook verification, ensuring smooth and safe checkout experiences.

- **AI Integration with Smart Fallback**  
  Robust multi-AI system for NLP and summarization. If OpenAI GPT is unavailable due to rate limits or errors, the system automatically falls back to Google Gemini, and if that also      fails, it switches to Hugging Face — guaranteeing uninterrupted AI functionality.

- **Dynamic Animations**  
  Built with **Framer Motion**, including page transitions, staggered reveals, and smooth hover interactions.

- **Glassmorphism UI**  
  Semi-transparent, blurred panels for navbar, cards, and footer with a modern layered look.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

---

## Getting Started

To set up and run this project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/ramanakumar2580/Rephrase-AI.git
```
```bash
cd Rephrase-AI
```

### 2. Install Dependencies
- Make sure you have Node.js installed
```bash
npm install
```

### 3. Set up Environment Variables
- Create a file named .env.local in the root of the project and add the following variable. This is required to make the contact form work.
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

UPLOADTHING_TOKEN=your_uploadthing_token

OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
HUGGINGFACE_API_TOKEN=your_huggingface_token

DATABASE_URL=your_database_connection_string
NODE_ENV=development

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

```
- You can get a free API key for all of them above.

## 4. Run the Development Server
```bash
npm run dev
```
- Open http://localhost:3000 in your browser to view the site.
