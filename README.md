# High-Scale Merchant Dashboard & API Platform

Full-stack merchant portal and supporting microservices built with Node.js/TypeScript + React.

## Features
- Real-time analytics dashboard
- Role-based access control (RBAC)
- Redis caching layer
- Supports thousands of concurrent users
- Microservices architecture

## Tech Stack
- Backend: Node.js, TypeScript, Express, Redis, MySQL
- Frontend: React, TypeScript, React Query
- Infra: Docker, AWS

## Architecture
Client (React) → API Gateway → Auth Service
                              → Merchant Service
                              → Analytics Service (Redis + MySQL)


## Getting Started
```bash
git clone https://github.com/olabodeIdowu/merchant-dashboard-platform.git
cd merchant-dashboard-platform
cp .env.example .env
docker-compose up --build

Key DecisionsRedis for session + analytics caching
JWT + refresh tokens with role claims
Horizontal scaling ready via stateless services


**Suggested folder structure**:

merchant-dashboard-platform/
├── backend/
│   ├── src/
│   │   ├── modules/ (auth, merchant, analytics)
│   │   ├── config/
│   │   └── app.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
├── docker-compose.yml
├── .env.example
└── README.md

