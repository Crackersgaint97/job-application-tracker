# Enterprise Business App (Job Application Tracker)

![.NET](https://img.shields.io/badge/.NET-9-512BD4?logo=dotnet&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Web%20API-5C2D91)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![EF Core](https://img.shields.io/badge/Entity%20Framework-Core-6DB33F)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

A full-stack job application tracking system built with **ASP.NET Core 9 + React + TypeScript**.

This project demonstrates practical, production-minded engineering across API design, layered architecture, database persistence, and responsive frontend UX.

## 🚀 Highlights

- Clean architecture-style separation:
  - `Domain` (entities, enums)
  - `Application` (DTOs, interfaces)
  - `Infrastructure` (EF Core, repositories, migrations)
  - `Api` (REST controllers, wiring)
  - `Client` (React + MUI dashboard)
- CRUD workflows for job applications
- Status-based visual indicators for pipeline tracking
- EF Core migrations + automatic DB migration on startup
- Environment-based API configuration for frontend

## 🧱 Tech Stack

**Backend**
- .NET 9 / ASP.NET Core Web API
- Entity Framework Core 9
- SQLite (local dev) + SQL Server-ready connection support
- Swagger / OpenAPI

**Frontend**
- React 18
- TypeScript
- Vite
- Material UI (MUI)
- Axios

## 📂 Repository Structure

```text
EnterpriseApp.Api/             # API host, controllers, startup wiring
EnterpriseApp.Application/     # DTOs, interfaces, app contracts
EnterpriseApp.Domain/          # Core entities and enums
EnterpriseApp.Infrastructure/  # EF Core DbContext, repositories, migrations
EnterpriseApp.Client/          # React frontend
```

## ⚙️ Local Development Setup

### 1) Clone the project

```bash
git clone https://github.com/Crackersgaint97/Enterprise-Business-App.git
cd Enterprise-Business-App
```

### 2) Run the API

```bash
dotnet restore
dotnet run --project EnterpriseApp.Api
```

API starts on `http://localhost:5296` (from launch settings).

Swagger: `http://localhost:5296/swagger`

### 3) Run the frontend

```bash
cd EnterpriseApp.Client
npm install
cp .env.example .env
npm run dev
```

Frontend defaults to Vite local URL (usually `http://localhost:5173`).

## 🔐 Configuration

Frontend API base URL can be changed in:

- `EnterpriseApp.Client/.env`

```env
VITE_API_URL=http://localhost:5296/api/JobApplications
```

Backend DB connection string is set in:

- `EnterpriseApp.Api/appsettings.json`
- `EnterpriseApp.Api/appsettings.Development.json`

For local development, SQLite is used with:

```json
"DefaultConnection": "Data Source=EnterpriseApp.db"
```

## 📌 Current Feature Set

- Create, read, update, delete applications
- Track fields:
  - Company
  - Role
  - URL
  - Location
  - Salary
  - Status
  - Applied date
- Dashboard table + summary cards
- Responsive layout for desktop and mobile

## 🛣️ Suggested Next Improvements

- Add authentication (JWT / Azure AD B2C)
- Add filtering/search/sorting on dashboard
- Add notes timeline per application
- Add unit/integration tests
- Add CI pipeline (build + lint + test)
- Deploy API + frontend with environment-specific configs

## 👤 Author

**Karlo**  
Junior Solutions Engineer | Technical Support Engineer

If you'd like to collaborate, connect with me on LinkedIn.
