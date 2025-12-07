# Retail Sales Management System - Backend

## Live API: [https://retail-backend-erdm.onrender.com/](https://retail-backend-erdm.onrender.com/)


This is the RESTful API backend for the Retail Sales Management System. It handles data persistence, querying, and seeding for the retail dashboard.

## Features

*   **API Endpoints**: REST endpoints to fetch filtered sales data and unique filter options.
*   **Database**: MongoDB integration for storing sales records.
*   **Seeding**: Utility script to generate dummy data for testing.
*   **Pagination**: Server-side pagination for efficient data loading.

## Tech Stack

*   Node.js
*   Express.js
*   MongoDB (via Mongoose)
*   Cors (Cross-Origin Resource Sharing)

## Installation & Setup

1.  Navigate to the backend directory:
    cd Backend

2.  Install dependencies:
    npm install

3.  Environment Configuration:
    Ensure you have a .env file (or matching environment variables) with:
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/retail_db

4.  Seed the Database (Optional - for dummy data):
    node src/utils/seeder.js

5.  Start the Server:
    npm start
    The server typically runs on http://localhost:5000.

## API Endpoints

### 1. Get Sales
*   URL: /api/sales
*   Method: GET
*   Query Params:
    *   page: Page number (default 1)
    *   limit: Items per page (default 10)
    *   search: Search term (Name or Phone)
    *   region, gender, minAge, maxAge, category, paymentMethod, sortBy...

### 2. Get Filters
*   URL: /api/sales/filters
*   Method: GET
*   Description: Returns unique values for all filterable fields (regions, categories, tags, etc.) to populate frontend dropdowns.
