# Wanderlust - Travel Booking Web Application

Wanderlust is a premium, full-stack Airbnb-style travel booking platform built with React, Node.js, and MySQL.

## Features

- **Authentication**: JWT-based login/signup with role-based access (User/Admin).
- **Listings**: Browse, search, and filter properties by category, price, and location.
- **Bookings**: Real-time booking system with price calculation and history.
- **Reviews**: Verified user reviews and ratings.
- **Wishlist**: Save favorite properties to your profile.
- **Admin Dashboard**: Comprehensive management of users, listings, and bookings.
- **UI/UX**: Modern, responsive design with Framer Motion animations and Dark Mode support.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Axios, Lucide React.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL with Prisma ORM.
- **Authentication**: JWT, bcrypt.

## Prerequisites

- Node.js (v16+)
- MySQL Server
- Cloudinary Account (for image uploads)
- Razorpay Account (for payments)

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd wanderlust-web-application
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend` folder and add your credentials (see `.env.example`).
- Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
- Create a `.env` file in the `frontend` folder:
```
VITE_API_URL=http://localhost:5000/api
```

## Running the Project

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend
```bash
cd frontend
npm run dev
```

## Project Structure

```
wanderlust/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── prisma/
│   │   └── schema.prisma
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   └── App.jsx
│   └── tailwind.config.js
└── README.md
```

## License
MIT
