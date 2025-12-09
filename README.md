# SEO Blog Generator

Generate SEO-optimized blog posts in seconds using AI. Built with Next.js, Firebase, and OpenAI.

## Features

- 🤖 **AI-Powered Blog Generation** - Generate blogs using OpenAI GPT-4o-mini
- 🔐 **User Authentication** - Email/password and Google sign-in via Firebase
- 📊 **Dashboard** - View and manage all your generated blogs
- 💳 **Subscription Plans** - Free, Pro, and Enterprise plans with Stripe integration
- 📝 **Blog Management** - Save, view, and track your blog usage

## Tech Stack

- **Frontend:** Next.js 16, React 19, TailwindCSS
- **Backend:** Next.js API Routes
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **AI:** OpenAI GPT-4o-mini
- **Payments:** Stripe

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
Create a `.env.local` file with:
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PRICE_PRO=your_pro_price_id
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=your_enterprise_price_id
NEXT_PUBLIC_URL=http://localhost:3000
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Project Structure

```
app/
├── api/              # API routes (generate-blog, checkout)
├── components/       # Reusable components (Navbar, Footer, etc.)
├── context/          # Auth context
├── dashboard/        # User dashboard
├── generate-blog/    # Blog generation page
├── login/            # Login page
├── signup/           # Signup page
└── view-plan/        # Subscription plans page
```

