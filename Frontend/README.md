# Retail Sales Management System - Frontend

## Live Demo: [https://retail-sales-management-opal.vercel.app/](https://retail-sales-management-opal.vercel.app/)


This is the frontend client for the Retail Sales Management System, built with React and Vite. It provides a comprehensive dashboard for visualizing sales data, filtering records, and viewing transaction details.

## Features

*   **Interactive Dashboard**: View key statistics (Total Units, Total Amount, Total Discount).
*   **Advanced Filtering**: Filter sales by Customer Region, Gender, Age Range, Product Category, Tags, Payment Method, and Date.
*   **Search**: Real-time search by Customer Name or Phone Number.
*   **Sorting**: Sort records by Name, Date, or Amount.
*   **Transaction Details**: View detailed breakdowns of individual sales in a modal.
*   **Responsive Design**: Clean, modern UI adapted for various screen sizes.

## Tech Stack

*   React 18
*   Vite (Build Tool)
*   CSS3 (Custom styling with variables)

## Installation & Setup

1.  Navigate to the frontend directory:
    cd Frontend

2.  Install dependencies:
    npm install

3.  Run the development server:
    npm run dev
    The application will usually run on http://localhost:5173.

4.  Build for production:
    npm run build

## Project Structure

*   src/components: React components (Dashboard, TransactionModal).
*   src/services: API handling logic (using fetch).
*   src/styles: Global and component-specific CSS.
