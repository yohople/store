# 🛍️ E-Commerce Platform

An advanced, modern e-commerce web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
This project provides a scalable, high-performance shopping experience with dynamic product listings, authentication, and cart management.

---

## 🚀 Features

- 🧭 **Next.js 14 (App Router)** – Server Components, Static Rendering & API routes
- ⚙️ **TypeScript** – Strong typing and clean, reliable code
- 🎨 **Tailwind CSS** – Modern, responsive, utility-first styling
- 🔐 **Authentication** – Clerk
- 🛒 **Shopping Cart** – Add, remove, and update products in cart
- 🗃️ **Database** – Prisma + supabase
- 🖼️ **Image Optimization** – Next.js Image component for fast loading
- ☁️ **Deployment Ready** – Easily deployable to Vercel, AWS, or Netlify

---

## 🧩 Tech Stack

| Category       | Technology                                        |
| -------------- | ------------------------------------------------- |
| Framework      | [Next.js](https://nextjs.org/)                    |
| Language       | [TypeScript](https://www.typescriptlang.org/)     |
| Styling        | [Tailwind CSS](https://tailwindcss.com/)          |
| Database       | [Prisma ORM](https://www.prisma.io/) + PostgreSQL |
| Authentication | [ClerkAuth](https://clerk.com/)                   |
| Deployment     | [Vercel](https://vercel.com/)                     |

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yohople/store.git
cd your-ecommerce-project

npm install

## create .env.local file in your root directory
DB_PASSWORD="your supabase db password"
DATABASE_URL="your db url"
DIRECT_URL="your direct url"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your clerk publishable key"
CLERK_SECRET_KEY="your clerk secret key"

ADMIN_USER_ID = "admin user id "
SUPABASE_URL="your supabase url"
SUPABASE_KEY="your supabase key"
NEXT_PUBLIC_WEBSITE_URL="your website link"


#run database migration
npx prisma migrate dev
#start development server
npm run dev
```
