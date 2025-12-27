# ⚡ Bun Blog (AZRA) - v0.3.1 Beta

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern, high-performance system for **Blogging** and **Asset Management** built with **Bun**, **Next.js 16 (App Router)**, and **React 19**. Featuring a comprehensive dashboard for managing posts, assets, maintenance reports, and users.

## ✨ Key Features

-   **📝 Blog Management**: Rich management for blog posts, categories, and tags.
-   **🏢 Asset & Maintenance**: Track assets, work orders, and maintenance history.
-   **🔐 Advanced Auth**: Secure Role-Based Access Control (RBAC) powered by NextAuth.
-   **📊 Analytics Dashboard**: Real-time reporting and lightweight analytics.
-   **⚡ High Performance**: Powered by **Bun** runtime and **Turbopack**.
-   **💅 Premium UI**: Modern interface using **HeroUI** and **Tailwind CSS**.

## 🛠️ Tech Stack

-   **Runtime**: [Bun](https://bun.sh)
-   **Framework**: [Next.js 16](https://nextjs.org)
-   **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
-   **Auth**: [NextAuth.js](https://next-auth.js.org/) (Credentials + JWT)
-   **Styling**: Tailwind CSS, HeroUI, Framer Motion
-   **Utils**: Zod (Validation), Upstash (Rate Limiting), Pino (Logging), React-PDF

## 🚀 Getting Started

### Prerequisites
-   [Bun](https://bun.sh) (v1.1+)
-   PostgreSQL Database

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/blog-bun.git
    cd blog-bun
    ```

2.  **Install dependencies**
    ```bash
    bun install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root based on `.env.example` (or use the minimal config below):
    ```env
    # Database
    DATABASE_URL="postgresql://user:pass@host:5432/db_name"

    # NextAuth
    NEXTAUTH_SECRET="your-secure-secret-key"
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Database Migration**
    ```bash
    bunx prisma generate
    bunx prisma db push
    # Optional: Seed data
    bunx prisma db seed
    ```

### 🏃‍♂️ Running the App

Start the development server with Turbopack:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `bun run dev` | Start dev server with Turbopack |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |

## 📂 Project Structure

```
azra/
├── app/                 # Next.js App Router (Pages, API)
├── components/          # Reusable UI Components
├── lib/                 # Utilities, Auth, Prisma Client
├── prisma/              # Database Schema & Seeds
├── public/              # Static Assets
└── types/               # Global Type Definitions
```

## 📄 License
[MIT License](LICENSE)
