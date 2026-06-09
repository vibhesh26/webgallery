# Praush Paintings and Sketch

Starter full-stack website for painting gallery and ordering.

## Stack

- Backend: Spring Boot (Java 17, Maven Wrapper, JPA, H2)
- Frontend: Angular standalone app
- API integration: Angular -> Spring REST (`/api`)

## Project Structure

- `backend/` - Spring Boot API for paintings and orders
- `frontend/` - Angular website for gallery, cart, and checkout

## Features Implemented

- Painting gallery API and seeded demo paintings
- Basic order API with stock validation and stock decrement
- Angular gallery page with Add to cart
- Angular checkout page to place an order
- Order success page

## Backend API Endpoints

- `GET /api/paintings?availableOnly=true`
- `GET /api/paintings/{id}`
- `POST /api/paintings`
- `PUT /api/paintings/{id}`
- `DELETE /api/paintings/{id}`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/{id}`

## Run Backend

From `backend/`:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend runs on `http://localhost:8080`.

## Run Frontend

Node.js is required (not currently installed on your machine).

1. Install Node.js LTS from https://nodejs.org/
2. Open terminal in `frontend/`
3. Run:

```powershell
npm install
npm start
```

Frontend runs on `http://localhost:4200` and proxies `/api` to the backend.

## Free Hosting Plan (No Monthly Hosting Bill)

- Frontend: Cloudflare Pages (free)
- Backend: Render free tier or Railway free credits (no fixed monthly bill, but check usage limits)
- Database: Supabase free tier or Neon free tier
- Domain: Buy only the domain (annual cost)

## Production Payment Upgrade Path

To add real payments later:

1. Keep Angular checkout UI
2. In Spring backend, add Stripe Java SDK
3. Create endpoint to generate Stripe Checkout Session
4. Add Stripe webhook endpoint to confirm payment and mark order `PAID`
5. Move from H2 to PostgreSQL for production

## Suggested Next Build Steps

1. Add admin authentication for painting management
2. Add image upload (Cloudinary or S3 compatible storage)
3. Add order status update workflow (`PENDING`, `PAID`, `SHIPPED`, `DELIVERED`)
4. Add email notifications after order placement
