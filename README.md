# E-Commerce-website
# E-Commerce Full-Stack Project (MERN)

[cite_start]This is a comprehensive full-stack e-commerce platform built using the **MERN stack**[cite: 261]. [cite_start]The project features a customer-facing storefront, a dedicated admin panel for inventory management, and a robust Node.js backend with MongoDB integration[cite: 205, 241].
---

## ## Project Architecture

[cite_start]The application is divided into three logical layers to ensure scalability and separation of concerns[cite: 205, 206]:

### ### 1. Storefront (React SPA)
[cite_start]The customer-facing layer allows users to browse products, manage a cart, and authenticate[cite: 208].
* [cite_start]**Routing**: Uses `react-router-dom` for dynamic, client-side navigation between Home, Category, Product, and Cart pages[cite: 209].
* [cite_start]**State Management**: Utilizes the **React Context API** (`ShopContext.jsx`) to provide a global state for the product catalog and cart[cite: 210, 212].
* [cite_start]**Cart Logic**: Implements **Optimistic UI updates**; the cart updates immediately on the client for a responsive feel and syncs with the database if the user is logged in[cite: 214, 215].
* [cite_start]**Authentication**: Features a login/signup system that stores **JWT tokens** in `localStorage` to maintain sessions[cite: 221, 222].

### ### 2. Admin Panel (React + Vite)
[cite_start]A specialized interface for managing the product catalog[cite: 228].
* [cite_start]**Vite Tooling**: Built with Vite for fast development and lightweight bundling[cite: 229].
* [cite_start]**Product CRUD**: Allows admins to add new products and list or remove existing items[cite: 230].
* [cite_start]**Two-Step Upload**: Uses **Multer** to upload images first; the returned URL is then saved with the product metadata to ensure data consistency[cite: 232, 233, 237].

### ### 3. Backend API (Node.js & Express)
[cite_start]The central core handling logic, security, and persistence[cite: 241].
* [cite_start]**Database**: Uses **MongoDB** with Mongoose schemas for Users and Products[cite: 242, 244].
* [cite_start]**Authentication Middleware**: A custom `fetchUser` middleware verifies JWT tokens in request headers to protect private routes like cart synchronization[cite: 247, 252].
* [cite_start]**File Storage**: Static image hosting is handled via Express and Multer disk storage[cite: 250, 251].

---

## ## Technical Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | [cite_start]React.js, React Router, Context API, Axios/Fetch, Bootstrap CSS [cite: 3, 4, 5, 6, 7] |
| **Admin** | [cite_start]React.js, Vite, Bootstrap, FormData [cite: 82, 83, 84, 85] |
| **Backend** | [cite_start]Node.js, Express.js, MongoDB, Mongoose, JWT, Multer [cite: 131, 132, 133, 134, 135] |

---

## ## Key Features

* [cite_start]**Product Browsing**: Filtered views for categories and specialized sections like "Popular in Women" and "New Collections"[cite: 218, 219].
* [cite_start]**Detailed Product Pages**: Dynamic routing via `useParams` to display specific item details and related products[cite: 220, 352].
* [cite_start]**User Cart**: Persistent cart data mapping product IDs to quantities, stored directly in the user document in MongoDB[cite: 245, 252].
* [cite_start]**Admin Dashboard**: Real-time inventory updates with automatic list refreshing after product removal[cite: 235, 236].


## ## Getting Started

### ### Prerequisites
* Node.js and npm installed.
* MongoDB Atlas account or local MongoDB server.

### ### Setup Instructions
1.  **Clone the Repo**: `git clone https://github.com/ProfitPannels/your-repo-name.git`
2.  **Backend Setup**: 
    * Navigate to the backend folder and run `npm install`.
    * Configure your `.env` with `MONGODB_URI` and `JWT_SECRET`.
    * [cite_start]Start the server: `node index.js` (Default: Port 5000)[cite: 109, 197].
3.  **Frontend/Admin Setup**: 
    * Navigate to the respective folders and run `npm install`.
    * Start the applications: `npm start` or `npm run dev`.

