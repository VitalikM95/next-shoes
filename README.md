# Next Shoes - Online Shoe Store

![Next Shoes Banner](/public/logo.svg)

Next Shoes is a modern e-commerce platform built with Next.js, showcasing a collection of stylish and comfortable footwear for men and women.

## 🚀 Features

- **Responsive Design**: Seamless experience across all devices
- **User Authentication**: Secure login and registration with Google OAuth or email/password
- **Product Browsing**: Browse shoes by category, filter by size, color, material, etc.
- **Shopping Cart**: Add products, manage quantities, and proceed to checkout
- **Order Management**: Track orders and view order history
- **Admin Panel**: Product and user management for administrators
- **Dark/Light Mode**: Choose your preferred theme

## 💻 Tech Stack

- **Frontend**:

  - [Next.js 14](https://nextjs.org/) with App Router
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [Shadcn UI](https://ui.shadcn.com/) components
  - [Lucide React](https://lucide.dev/docs/lucide-react) for icons

- **State Management**:

  - [Zustand](https://github.com/pmndrs/zustand) for global state
  - [SWR](https://swr.vercel.app/) for data fetching and caching

- **Authentication**:

  - [NextAuth.js](https://next-auth.js.org/) for authentication
  - Google OAuth integration

- **Backend**:
  - [Prisma](https://www.prisma.io/) for database ORM
  - RESTful API endpoints with Next.js API routes

## 📋 Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- A database (PostgreSQL recommended)

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/next-shoes.git
   cd next-shoes
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Configure environment variables:
   Create a `.env.local` file based on `.env.example`:

   ```
   DATABASE_URL=your_database_url
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Set up the database schema:

   ```bash
   npx prisma db push
   ```

5. (Optional) Seed the database with sample data:
   ```bash
   npm run seed
   ```

## 🏃‍♂️ Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
/
├── app/                    # Next.js App Router routes
│   ├── (auth)/             # Authentication pages (login, register, etc.)
│   ├── (main)/             # Main application pages
│   ├── api/                # API routes
│   ├── admin/              # Admin panel (protected routes)
│   └── checkout/           # Checkout process
├── components/             # React components
│   ├── cart/               # Cart-related components
│   ├── layout/             # Layout components (header, footer, etc.)
│   ├── shared/             # Shared components
│   └── ui/                 # UI components
├── lib/                    # Utility functions and custom hooks
│   ├── auth/               # Authentication utilities
│   ├── db/                 # Database utilities
│   ├── hooks/              # Custom hooks
│   └── store/              # Zustand stores
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets
└── types/                  # TypeScript types
```

## 🚢 Deployment

This project is ready to be deployed on [Vercel](https://vercel.com/).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fnext-shoes)

## 🙏 Acknowledgements

- Shoe product images and descriptions are used for demo purposes only
- All UI/UX design inspired by modern e-commerce platforms

---

This is a test project created for demonstration purposes and will be deployed on Vercel.
