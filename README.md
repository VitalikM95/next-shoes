# Next Shoes - Online Shoe Store

<img src="/public/favicon.svg" alt="Next Shoes Banner" width="200" height="200" />

Next Shoes is a modern e-commerce platform built with Next.js, showcasing a collection of stylish and comfortable footwear for men and women.

## 🚀 Features

- **Responsive Design**: Seamless experience across all devices
- **User Authentication**: Secure login and registration with Google OAuth or email/password
- **Product Browsing**: Browse shoes by category, filter by size, color, material, etc.
- **Shopping Cart**: Add products, manage quantities, and proceed to checkout
- **Order Management**: Track orders and view order history

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

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VitalikM95/next-shoes.git
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

## 🚢 Deployment

This project is deployed on [Vercel](https://vercel.com/) and is available at [https://next-shoes-azure.vercel.app/](https://next-shoes-azure.vercel.app/)

## 🙏 Acknowledgements

- Shoe product images and descriptions are used for demo purposes only
- All UI/UX design inspired by modern e-commerce platforms

---

This is a test project created for demonstration purposes.
