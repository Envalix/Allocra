# Allocra

**Smart DCA (Dollar Cost Averaging) Alert Platform**

Allocra helps long-term investors allocate capital automatically based on total investment or monthly investment plans, with price-based and time-based triggers.

> _Discipline beats timing, every time._

---

## 🎯 Product Overview

Allocra is a micro-SaaS that removes emotion from investing by automating Dollar Cost Averaging alerts. Instead of trying to time the market, investors set up DCA plans and receive notifications when it's time to invest.

### Key Features

- **Time-Based Triggers**: Daily, weekly, or monthly investment schedules
- **Price-Based Alerts**: Get notified when prices drop below thresholds
- **Flexible Plans**: Total investment or monthly budget allocation
- **Email Notifications**: Stay informed without obsessing over markets
- **Mobile-First Design**: Manage your investments from anywhere
- **Broker Agnostic**: Works with any brokerage (alert-only, no trading)

---

## 🛠️ Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| **Framework**  | Next.js 16 (App Router, TypeScript) |
| **Styling**    | Tailwind CSS v4 + DaisyUI v5        |
| **Database**   | MongoDB Atlas                       |
| **ORM**        | Prisma                              |
| **Deployment** | Vercel                              |
| **Email**      | Brevo or Resend (placeholder)       |

---

## 📁 Project Structure

```
allocra/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── dca/              # DCA plan endpoints
│   │   │   └── plans/        # CRUD for DCA plans
│   │   ├── stocks/           # Stock data endpoints
│   │   │   └── price/        # Price fetching
│   │   └── triggers/         # Cron job endpoints
│   │       ├── price/        # Price-based triggers
│   │       └── time/         # Time-based triggers
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/               # React components
│   ├── layout/               # Layout components
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Footer.tsx        # Site footer
│   │   └── Container.tsx     # Responsive container
│   └── ui/                   # UI components
│       ├── Button.tsx        # Button component
│       └── Card.tsx          # Card component
├── lib/                      # Utilities & services
│   ├── config/               # Configuration
│   │   └── env.ts            # Environment variables
│   ├── db/                   # Database
│   │   └── prisma.ts         # Prisma client
│   └── services/             # Business logic
│       ├── dca-calculator.ts # DCA calculations
│       ├── notification.ts   # Email service
│       └── stock-provider.ts # Stock data
├── prisma/                   # Prisma schema
│   └── schema.prisma         # Database models
├── types/                    # TypeScript types
│   └── index.ts              # Shared types
├── .env.example              # Environment template
├── tailwind.config.ts        # Tailwind configuration
├── next.config.ts            # Next.js configuration
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

---

## 🚀 Local Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/allocra.git
   cd allocra
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration (see [Environment Variables](#-environment-variables))

4. **Generate Prisma client**

   ```bash
   npm run db:generate
   ```

5. **Push database schema**

   ```bash
   npm run db:push
   ```

6. **Start development server**

   ```bash
   npm run dev
   ```

7. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure:

### Required

| Variable       | Description               |
| -------------- | ------------------------- |
| `DATABASE_URL` | MongoDB connection string |

### Optional

| Variable                     | Description               | Default                 |
| ---------------------------- | ------------------------- | ----------------------- |
| `NEXT_PUBLIC_APP_NAME`       | Application name          | `Allocra`               |
| `NEXT_PUBLIC_APP_URL`        | Public URL                | `http://localhost:3000` |
| `STOCK_DATA_PROVIDER`        | Stock API provider        | `mock`                  |
| `EMAIL_PROVIDER`             | Email service             | `mock`                  |
| `CRON_SECRET`                | Secret for cron endpoints | -                       |
| `ENABLE_EMAIL_NOTIFICATIONS` | Enable email sending      | `false`                 |
| `ENABLE_PRICE_ALERTS`        | Enable price triggers     | `true`                  |
| `ENABLE_TIME_TRIGGERS`       | Enable time triggers      | `true`                  |

### Stock Data Providers (choose one)

- `ALPHA_VANTAGE_API_KEY`
- `FINNHUB_API_KEY`
- `POLYGON_API_KEY`

### Email Providers (choose one)

- Brevo: `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`
- Resend: `RESEND_API_KEY`, `RESEND_SENDER_EMAIL`

---

## 📜 Available Scripts

| Command                | Description               |
| ---------------------- | ------------------------- |
| `npm run dev`          | Start development server  |
| `npm run build`        | Build for production      |
| `npm run start`        | Start production server   |
| `npm run lint`         | Run ESLint                |
| `npm run lint:fix`     | Fix ESLint errors         |
| `npm run format`       | Format code with Prettier |
| `npm run format:check` | Check code formatting     |
| `npm run type-check`   | TypeScript type checking  |
| `npm run db:generate`  | Generate Prisma client    |
| `npm run db:push`      | Push schema to database   |
| `npm run db:studio`    | Open Prisma Studio        |

---

## 🌐 Deployment (Vercel)

### Automatic Deployment

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy!

### Environment Setup on Vercel

1. Go to Project Settings → Environment Variables
2. Add all required variables from `.env.example`
3. Make sure `DATABASE_URL` points to your production MongoDB Atlas cluster

### Cron Jobs

Vercel Cron is configured in `vercel.json`:

- **Time Triggers**: Daily at 9:00 AM EST (weekdays)
- **Price Triggers**: Every 2 hours (weekdays)

> Note: Cron jobs require Vercel Pro plan for < 1-minute intervals

### Build Settings

- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

---

## 🗄️ Database Schema

### Models

| Model               | Description                       |
| ------------------- | --------------------------------- |
| `User`              | User accounts                     |
| `Stock`             | Tracked stocks with cached prices |
| `StockPriceHistory` | Historical price data             |
| `DcaPlan`           | DCA investment plans              |
| `DcaStep`           | Individual buy events             |
| `AlertEvent`        | Notification history              |

### Prisma Commands

```bash
# View/edit data
npm run db:studio

# Push schema changes
npm run db:push

# Generate client after schema changes
npm run db:generate
```

---

## 📱 Mobile-First Design

Allocra is designed mobile-first with:

- Responsive breakpoints: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- Touch-friendly UI components
- Native mobile feel with DaisyUI
- Safe area insets for notched devices
- Optimized tap targets

---

## 🔮 Roadmap

### MVP (Current)

- [x] Project setup
- [x] Database schema
- [x] API routes structure
- [x] Service layer
- [x] Responsive layout
- [ ] Authentication
- [ ] DCA plan CRUD
- [ ] Email notifications

### Future

- [ ] Multiple stock support per plan
- [ ] Portfolio view
- [ ] Price charts
- [ ] Push notifications
- [ ] API integrations (real stock data)

---

## 📄 License

Private - All rights reserved

---

## 🤝 Contributing

This is a private project. Please contact the maintainers for contribution guidelines.

---

Built with ❤️ for disciplined investors.
