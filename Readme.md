# Just Shop 🛒

A full-stack MERN e-commerce application built with React, Node.js, Express.js, and MongoDB. The platform provides a seamless shopping experience with secure authentication, product browsing, cart management, and order processing capabilities.


## 🚀 Features

* User Registration and Login Authentication
* JWT Authentication with HTTP Cookies
* Product Listing and Browsing
* Shopping Cart Functionality
* Responsive User Interface
* State Management using Redux Toolkit
* Secure REST APIs
* MongoDB Database Integration
* Protected Routes
* Toast Notifications for User Feedback


## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* React Toastify
* React Icons

### Backend

* Node.js
* Express.js
* JWT Authentication
* Bcrypt.js
* Cookie Parser
* CORS

### Database

* MongoDB
* Mongoose

### Development Tools

* Git & GitHub
* Postman
* Nodemon
* Prettier



## 📂 Project Structure

just-shop/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md


## ⚙️ Installation

### Clone Repository

git clone https://github.com/AnsariSadaan/just-shop.git

cd just-shop



## Backend Setup

Navigate to backend directory:

cd backend


Install dependencies:

npm install

Create a `.env` file inside backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173

Run backend server:

npm run dev

Backend will run on:

http://localhost:5000


## Frontend Setup

Open a new terminal and navigate to frontend directory:


cd frontend


Install dependencies:


npm install

Create `.env` file if required:

VITE_API_URL=http://localhost:5000/api

Start frontend server:

npm run dev

Frontend will run on:

http://localhost:5173


## API Features

### Authentication

* Register User
* Login User
* Logout User

### Products

* Fetch Products
* View Product Details

### Cart

* Add to Cart
* Remove from Cart
* Update Quantity

### User

* View Profile
* Update User Information


## Future Improvements

* Razorpay Payment Integration
* Product Reviews and Ratings
* Wishlist Feature
* Order History
* Admin Dashboard
* Inventory Management
* Search and Filtering
* Email Notifications
* Product Recommendations


## Author

### Sadaan Ansari

Junior Software Developer | MERN Stack Developer

GitHub:
https://github.com/AnsariSadaan

LinkedIn:
https://www.linkedin.com/in/sadaan-ansari-82a191214/



## License

This project is licensed under the MIT License.