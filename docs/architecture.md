# Architecture Documentation

## 1. Backend Architecture

The backend implements a **clean layered architecture** using **Node.js** and **Express**. It follows RESTful principles to provide a stateless API.

*   **Layer 1: Entry Point (`app.js` / `server.js`)**: Initializes the Express app, configures middleware (CORS, Body Parser), connects to MongoDB, and registers routes.
*   **Layer 2: Routes (`/routes`)**: Defines API endpoints (e.g., `GET /api/sales`). It maps HTTP requests to specific controller functions.
*   **Layer 3: Controllers (`/controllers`)**: Handles the business logic. It parses requests, interacts with the Service layer (or direct Models), and formats JSON responses.
*   **Layer 4: Services (`/services`)**: Encapsulates core business logic and complex data retrieval rules (e.g., filtering logic, pagination calculations).
*   **Layer 5: Data Access Layer / Models (`/models`)**: Uses **Mongoose** schemas to define data structure and validation rules for interaction with the **MongoDB** database.

## 2. Frontend Architecture

The frontend is a **Single Page Application (SPA)** built with **React** and **Vite**.

*   **Component-Based Structure**: The UI is decomposed into reusable functional components.
    *   **Dashboard**: The main container managing state (filters, pagination, data).
    *   **TransactionModal**: A presentational component for displaying detailed record views.
*   **State Management**: Uses React's internal `useState` and `useEffect` hooks. Global stores (like Redux) are avoided for simplicity, given the scoped nature of the dashboard requirements.
*   **Styling**: Uses standard CSS modules and global CSS variables for a consistent theme (colors, fonts).

## 3. Data Flow

1.  **User Action**: User sets a filter (e.g., selects "Region: North") on the Dashboard.
2.  **State Update**: React updates the `filters` state variable.
3.  **Effect Trigger**: `useEffect` detects the state change and calls `loadSales()`.
4.  **API Request**: The frontend sends a GET request: `/api/sales?region=North&page=1`.
5.  **Route Handling**: Express receives the request and routes it to `salesController`.
6.  **Query Building**: The controller/service constructs a MongoDB query object `{ "customer.region": "North" }`.
7.  **Database Query**: Mongoose executes the query against MongoDB with `limit` and `skip` for pagination.
8.  **Response**: The backend returns a JSON object containing the `data` array and `pagination` metadata.
9.  **UI Render**: React receives the new data and re-renders the sales table.

## 4. Folder Structure

```
/
├── Backend/
│   ├── src/
│   │   ├── config/         # Database connection logic
│   │   ├── controllers/    # Request handlers (salesController.js)
│   │   ├── models/         # Mongoose schemas (Sale.js)
│   │   ├── routes/         # API route definitions (salesRoutes.js)
│   │   ├── services/       # Business logic (salesService.js)
│   │   └── utils/          # Seeder scripts
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point
│
├── Frontend/
│   ├── src/
│   │   ├── components/     # React components (Dashboard.jsx)
│   │   ├── services/       # API call definitions (api.js)
│   │   ├── styles/         # CSS files (App.css)
│   │   ├── App.jsx         # Main component
│   │   └── main.jsx        # Entry point DOM rendering
│   └── vite.config.js      # Vite configuration
│
└── docs/                   # Documentation files
```

## 5. Module Responsibilities

| Module | Responsibility |
| :--- | :--- |
| **salesRoutes.js** | Define endpoints like `/` and `/filters` and map them to controller methods. |
| **salesController.js** | validate inputs, call services, and send HTTP responses (200, 500, etc.). |
| **salesService.js** | Build dynamic MongoDB queries based on filter params; standardizes pagination. |
| **Sale.js** | Define the schema for a Sale transaction, including customer, product, and store details. |
| **Dashboard.jsx** | Main UI controller. Manages filter state, handles user interactions, renders the Grid/Table. |
| **TransactionModal.jsx** | Specialized view for details of a single transaction. |
| **api.js** | Axios/Fetch wrapper to handle network requests to the backend. |
