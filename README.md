# E-Commerce-website(MERN)


This is a comprehensive full-stack e-commerce platform built using the **MERN stack**. The project features a customer-facing storefront, a dedicated admin panel for inventory management, and a robust Node.js backend with MongoDB integration.
---

 ## Project Architecture

The web application is divided into three logical layers to ensure scalability and separation of concerns:

 ### 1. Storefront (React SPA)
The customer-facing layer allows users to browse products, manage a cart, and authenticate.
* **Routing**: Uses `react-router-dom` for dynamic, client-side navigation between Home, Category, Product, and Cart pages.
* **State Management**: Utilizes the **React Context API** (`ShopContext.jsx`) to provide a global state for the product catalog and cart.
* **Cart Logic**: Implements **Optimistic UI updates**; the cart updates immediately on the client for a responsive feel and syncs with the database if the user is logged in.
* **Authentication**: Features a login/signup system that stores **JWT tokens** in `localStorage` to maintain sessions.

 ### 2. Admin Panel (React + Vite)
A specialized interface for managing the product catalog.
* ]**Vite Tooling**: Built with Vite for fast development and lightweight bundling.
* **Product CRUD**: Allows admins to add new products and list or remove existing items.
* **Two-Step Upload**: Uses **Multer** to upload images first; the returned URL is then saved with the product metadata to ensure data consistency.

 ### 3. Backend API (Node.js & Express)
The central core handling logic, security, and persistence.
* **Database**: Uses **MongoDB** with Mongoose schemas for Users and Products.
* ]**Authentication Middleware**: A custom `fetchUser` middleware verifies JWT tokens in request headers to protect private routes like cart synchronization.
* **File Storage**: Static image hosting is handled via Express and Multer disk storage.

---
 ## Technical Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js, React Router, Context API, Axios/Fetch, Bootstrap CSS  |
| **Admin** | React.js, Vite, Bootstrap, FormData  |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT, Multer |

---

## Key Features

* **Product Browsing**: Filtered views for categories and specialized sections like "Popular in Women" and "New Collections".
* **Detailed Product Pages**: Dynamic routing via `useParams` to display specific item details and related products.
* **User Cart**: Persistent cart data mapping product IDs to quantities, stored directly in the user document in MongoDB.
* **Admin Dashboard**: Real-time inventory updates with automatic list refreshing after product removal.


## Getting Started

 ### Prerequisites
* Node.js and npm installed.
* MongoDB Atlas account or local MongoDB server.


