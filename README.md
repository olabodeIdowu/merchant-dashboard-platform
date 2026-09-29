# High-Scale Merchant Dashboard & API Platform

Full-stack merchant portal + supporting microservices.

**Stack:** Node.js • TypeScript • React • Redis • MySQL • Docker

## Features
- Real-time analytics dashboard
- Role-based access control (RBAC)
- Redis caching
- Horizontal scaling ready
- Supports thousands of concurrent users

## Quick Start
```bash
git clone https://github.com/olabodeIdowu/merchant-dashboard-platform.git
cd merchant-dashboard-platform
cp .env.example .env
docker-compose up --build

Frontend → http://localhost:3000
Backend  → http://localhost:4000


**Folder structure**
merchant-dashboard-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── merchant/
│   │   │   └── analytics/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
├── .env.example
└── README.md

