# High-Scale Merchant Dashboard & API Platform

> Production-style full-stack merchant portal and supporting microservices designed for thousands of concurrent users, real-time analytics, and strict role-based access control.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Redis](https://img.shields.io/badge/Redis-7-red)
![MySQL](https://img.shields.io/badge/MySQL-8-orange)
![Docker](https://img.shields.io/badge/Docker-ready-blue)

## Overview

This project demonstrates a scalable merchant-facing platform built with a modular monolith / lightweight microservices approach.

**Key capabilities:**
- Real-time analytics dashboard
- Role-Based Access Control (RBAC) – Admin, Merchant Owner, Staff
- Redis-powered caching for high-read analytics paths
- JWT authentication with refresh tokens
- Stateless services ready for horizontal scaling
- Clean separation between API gateway style routing and domain modules

## Architecture

┌─────────────────────┐
│   React Dashboard   │  (TypeScript + React Query)
└──────────┬──────────┘
           │ REST
┌──────────▼──────────┐
│   API Layer         │  (Express + TypeScript)
│  - Auth Middleware  │
│  - RBAC Guard       │
└──────────┬──────────┘
           │
    ┌──────┼──────┐
    ▼      ▼      ▼
┌───────┐ ┌──────┐ ┌────────────┐
│ Auth  │ │Merch.│ │ Analytics  │
│Module │ │Module│ │  Module    │
└───┬───┘ └──┬───┘ └─────┬──────┘
    │        │           │
    └────────┼───────────┘
             ▼
      ┌─────────────┐     ┌─────────┐
      │   MySQL     │◄────┤  Redis  │
      │ (Source of  │     │ (Cache) │
      │   Truth)    │     └─────────┘
      └─────────────┘


### Design Decisions & Trade-offs

| Decision | Why | Trade-off |
|----------|-----|---------|
| Modular monolith first | Faster delivery + easier consistency | Can extract to true microservices later |
| Redis for analytics | Protects MySQL under high concurrent reads | Accepts short eventual consistency window |
| JWT + Refresh Tokens | Stateless auth, works with horizontal scaling | Token revocation needs denylist or short expiry |
| Role claims in JWT | Fast authorization without DB hit on every request | Role changes require re-login or short-lived tokens |

## Tech Stack

**Backend:** Node.js, TypeScript, Express, Zod, MySQL2, ioredis, jsonwebtoken, bcrypt  
**Frontend:** React 18, TypeScript, Vite, React Query, React Router  
**Infra:** Docker, Docker Compose, GitHub Actions ready

## Quick Start

```bash
git clone https://github.com/olabodeIdowu/merchant-dashboard-platform.git
cd merchant-dashboard-platform/backend
docker-compose up --build

Frontend: http://localhost:3000  
Backend API: http://localhost:4000  
Health: http://localhost:4000/health

## Project Structure

backend/
├── src/
│   ├── config/
│   ├── modules/
│   │   ├── auth/
│   │   ├── merchant/
│   │   └── analytics/
│   ├── middleware/
│   ├── utils/
│   ├── types/
│   ├── app.ts
│   └── server.ts
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   └── App.tsx

What I OwnedEnd-to-end architecture and implementation
RBAC design and enforcement
Caching strategy and invalidation approach
API contracts and error handling standards
Dockerization and local developer experience

Future ImprovementsMove analytics to event-driven read models
Add OpenTelemetry tracing
Introduce API rate limiting and more advanced observability
Extract Analytics service into its own deployable unit

