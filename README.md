# JobFinder - Job Search Application

![Angular](https://img.shields.io/badge/Angular-17+-red)
![NgRx](https://img.shields.io/badge/NgRx-17+-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-blue)
![JSON Server](https://img.shields.io/badge/JSON%20Server-Mock%20API-green)

##  Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Features Implementation](#features-implementation)
- [State Management with NgRx](#state-management-with-ngrx)
- [API Integration](#api-integration)
- [Authentication Flow](#authentication-flow)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

##  Overview

JobFinder is a modern Single Page Application (SPA) built with Angular that helps job seekers search, track, and manage job applications. The application integrates with public job APIs to provide real-time job listings while using JSON Server for persisting user data, favorites, and applications.

##  Features

###  Authentication
- User registration with name, email, and password
- Login with email/password
- Session persistence using localStorage
- Protected routes for authenticated users
- Guest routes for non-authenticated users

### Job Search
- Search jobs by keywords (title-based search)
- Filter by location
- Sort by publication date (newest first)
- Pagination (10 results per page)
- Loading indicators during search
- Optional filters (contract type, experience level, minimum salary)

###  Job Listings
Each job card displays:
- Job title
- Company name
- Location
- Publication date
- Short description
- Link to original job posting
- Salary (if available)
- Favorite button (authenticated users)
- Track application button (authenticated users)

###  Favorites (NgRx Managed)
- Add/remove jobs to favorites
- View all favorite jobs in dedicated page
- Visual indicator for favorited jobs
- Prevent duplicate favorites
- Persisted in JSON Server

###  Applications Tracking
- Track job applications with status:
  - Pending (default)
  - Accepted
  - Rejected
- Add personal notes to applications
- Update application status
- Remove applications from tracking
- Statistics dashboard showing application counts by status
- Persisted in JSON Server

###  User Profile
- View and edit personal information
- Change password
- View activity statistics:
  - Total applications
  - Applications by status
  - Favorites count
- Delete account (with confirmation modal)
- Quick access to applications, favorites, and search

##  Tech Stack

### Frontend
- **Angular 17+** - Framework
- **NgRx** - State management
- **RxJS** - Reactive programming
- **TailwindCSS** - Styling
- **TypeScript** - Programming language

### Backend (Mock)
- **JSON Server** - Mock REST API
- **Public Job APIs**:
  - The Muse API
  - Adzuna API
  - USAJobs API
  - Arbeitnow API

##  Project Structure

```
src/
├── app/
│   ├── core/                      # Core module (singleton services)
│   │   ├── adapters/              # API data adapters
│   │   ├── guards/                 # Route guards
│   │   ├── interceptors/           # HTTP interceptors
│   │   ├── layout/                  # Layout components
│   │   ├── models/                  # TypeScript interfaces
│   │   ├── services/                # Core services
│   │   └── store/                   # NgRx state management
│   │       ├── actions/              # NgRx actions
│   │       ├── effects/               # NgRx effects
│   │       ├── reducers/              # NgRx reducers
│   │       └── selectors/             # NgRx selectors
│   ├── features/                   # Feature modules
│   │   ├── applications/            # Applications feature
│   │   ├── auth/                     # Authentication feature
│   │   ├── favorites/                # Favorites feature
│   │   ├── home/                      # Home feature
│   │   ├── jobs/                      # Jobs feature
│   │   └── profile/                   # Profile feature
│   └── shared/                       # Shared components
│       └── components/                # Reusable UI components
├── assets/                           # Static assets
├── environments/                      # Environment configuration
└── styles.css                         # Global styles
```

##  Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/job-finder.git
cd job-finder
```

2. **Install dependencies**
```bash
npm install
```

3. **Install JSON Server globally (optional)**
```bash
npm install -g json-server
```

4. **Create db.json file in the root directory**
```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "createdAt": "2026-02-10T10:30:00Z"
    }
  ],
  "favorites": [],
  "applications": []
}
```

## ️ Configuration

### Environment Files

**environments/environment.ts** (production)
```typescript
export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000',
  museApiKey: 'your-muse-api-key',
  adzunaAppId: 'your-adzuna-app-id',
  adzunaAppKey: 'your-adzuna-app-key'
};
```

**environments/environment.development.ts** (development)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  museApiKey: 'your-muse-api-key',
  adzunaAppId: 'your-adzuna-app-id',
  adzunaAppKey: 'your-adzuna-app-key'
};
```

##  Running the Application

### 1. Start JSON Server (Mock Backend)
```bash

npm run json-server
# or
json-server --watch db.json --port 3000
```

### 2. Start the Angular Application
```bash

npm start
# or
ng serve
```

### 3. Access the Application
Open your browser and navigate to `http://localhost:4200`

##  Features Implementation

### Authentication Flow
```typescript
// Key features:
// - Login with email/password
// - Registration with validation
// - Auto-login on page refresh
// - Protected routes with guards
// - User data stored in localStorage
```

### NgRx State Management
The application uses NgRx for managing:
- **Jobs State**: Search results, filters, pagination
- **Favorites State**: User's favorite jobs (per requirements)
- **Applications State**: Job applications with status and notes

### API Integration
The application integrates with multiple job APIs:
- **The Muse API**: Primary job source
- **Adzuna API** (optional): Additional job listings
- **USAJobs API** (optional): Government jobs
- **Arbeitnow API** (optional): Remote jobs

### Responsive Design
Built with TailwindCSS, the application is fully responsive:
- Mobile-first approach
- Optimized for all screen sizes
- Consistent UI across devices

##  Styling

### TailwindCSS Configuration
The project uses TailwindCSS with custom configuration:
- Custom color palette
- Responsive utilities
- Animation classes
- Component styling

### Custom Components
Reusable UI components:
- `ui-button`: Button component with variants
- `ui-input`: Input component with validation
- `ui-modal`: Modal dialog component
- `spinner`: Loading indicator
- `toast`: Notification system
- `pagination`: Pagination component



##  API Documentation

### JSON Server Endpoints
- `GET /users` - Get all users
- `POST /users` - Register new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /favorites?userId=:id` - Get user favorites
- `POST /favorites` - Add to favorites
- `DELETE /favorites/:id` - Remove from favorites
- `GET /applications?userId=:id` - Get user applications
- `POST /applications` - Add application
- `PATCH /applications/:id` - Update application
- `DELETE /applications/:id` - Delete application

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Author

###  Ahmed Taoudi

##  Acknowledgments

- [The Muse API](https://www.themuse.com/developers/api/v2)
- [Adzuna API](https://developer.adzuna.com/)
- [USAJobs API](https://developer.usajobs.gov/)
- [Arbeitnow API](https://arbeitnow.com/api/jobs)

---
