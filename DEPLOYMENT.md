# Deployment Guide for Retail Sales Management System

This guide will walk you through deploying the **MERN Stack** (MongoDB, Express, React, Node.js) application. We will use:
- **Render** for the Backend (Node.js/Express)
- **Vercel** for the Frontend (React/Vite)
- **MongoDB Atlas** for the Database

---

## 1. Prerequisites

Before you begin, ensure you have:
1.  A [GitHub](https://github.com/) account.
2.  A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (Free Tier).
3.  A [Render](https://render.com/) account.
4.  A [Vercel](https://vercel.com/) account.
5.  This project pushed to a GitHub repository.

---

## 2. Database Setup (MongoDB Atlas)

1.  Log in to MongoDB Atlas and create a new **Cluster** (Free Shared Tier).
2.  Go to **Database Access** -> Create a new Database User (e.g., `admin` / `password123`). **Remember this password**.
3.  Go to **Network Access** -> Add IP Address -> Allow Access from Anywhere (`0.0.0.0/0`).
4.  Go to **Clusters** -> Click **Connect** -> Choose "Drivers" -> Copy the connection string.
    *   It looks like: `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
    *   Replace `<password>` with your actual password.
    *   **Save this connection string** for the next step.

---

## 3. Backend Deployment (Render)

1.  Log in to your [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    *   **Name**: `retail-backend` (or similar)
    *   **Root Directory**: `Backend` (Important!)
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
    *   **Tier**: Free
5.  Scroll down to **Environment Variables** and add/click "Add Environment Variable":
    *   **Key**: `MONGO_URI`
    *   **Value**: (Paste your MongoDB connection string from Step 2)
    *   **Key**: `PORT`
    *   **Value**: `5000`
6.  Click **Create Web Service**.
7.  Wait for the deployment to finish. Once live, copy the **onrender.com URL** (e.g., `https://retail-backend.onrender.com`).
    *   *Note: Free tier spins down after inactivity, so the first request might take 50s.*

---

## 4. Frontend Deployment (Vercel)

1.  Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  Configure the project:
    *   **Framework Preset**: Vite (should be auto-detected).
    *   **Root Directory**: Click "Edit" and select `Frontend`.
5.  Open the **Environment Variables** section:
    *   **Key**: `VITE_API_URL`
    *   **Value**: The full Backend URL from Step 3 + `/api/sales`
        *   Example: `https://retail-backend.onrender.com/api/sales`
        *   *Make sure there is no trailing slash after `sales`.*
6.  Click **Deploy**.

---

## 5. Verification

1.  Visit your new Vercel URL (e.g., `https://retail-frontend.vercel.app`).
2.  The dashboard should load.
3.  If you see "Failed to fetch data", check the Network tab in Developer Tools.
    *   If the backend is waking up (Render free tier), it might take a minute. Refresh the page.
    *   Verify the `VITE_API_URL` in Vercel settings matches your Render URL.

**Congratulations! Your app is now live!** 🚀
