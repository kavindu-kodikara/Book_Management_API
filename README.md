# 📚 Book Management API

A RESTful API for managing books, authors, categories, publishers, and users.  
Built with **Node.js**, **Express**, **MySQL**, and **JWT Authentication**.

---

## 🚀 Features

- User registration and login with **JWT authentication**
- Passwords securely hashed with **bcrypt**
- CRUD operations for books, authors, categories, and publishers
- Add and fetch **book reviews**
- **Search books** by title, author, or category
- File upload support for **book covers**

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/kavindu-kodikara/Book_Management_API.git
cd book-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
#port for requests
PORT=3000

#db configs
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=book_management_api
DB_PORT=3306

JWT_SECRET=yoyr_secret_key
```

### 4. Run database migrations

Use the provided [`book_management_api.sql`](docs/book_management_api.sql) `book_management_api.sql` file to create tables:

```sql
mysql -u root -p book_management < book_management_api.sql
```

### 5. Start the server

```bash
npm run start:dev
```

- **Server URL:** http://localhost:3000/api

---

## 📖 API Endpoints

### 👤 Users

| Method | Endpoint | Headers | Description |
|--------|----------|---------|-------------|
| POST | `/users/register` | `username` (string, required)<br>`password` (string, required)<br>`fullName` (string, required) | Register a new user |
| POST | `/users/login` | `username` (string, required)<br>`password` (string, required) | Login and receive JWT |
| GET | `/users/profile` | `Authorization: Bearer <token>` | Get user profile (protected) |


### 📚 Books

| Method | Endpoint | Body / Query | Description |
|--------|----------|--------------|-------------|
| GET | `/books` | `page` (int, optional)<br>`limit` (int, optional) | Get all books with pagination |
| GET | `/books/:id` | Path: `id` (int, required) | Get book details by ID with authors, categories, and reviews |
| POST | `/books` | `title` (string, required)<br>`isbn` (string, required)<br>`publicationDate` (date, required)<br>`description` (string, required)<br>`pageCount` (int, required)<br>`AuthorsId` (int, required)<br>`publishersId` (int, required)<br>`categoryIds` (int Array, required) | Create a new book |
| PUT | `/books/:id` | Path: `id` (int, required)<br>Body: `title` (string, optional)<br>`isbn` (string, optional)<br>`publicationDate` (date, optional)<br>`description` (string, optional)<br>`pageCount` (int, optional)<br>`AuthorsId` (int, optional)<br>`publishersId` (int, optional)<br>`categoryIds` (int Array, optional) | Update book |
| DELETE | `/books/:id` | Path: `id` (int, required) | Delete book |
| GET | `/books/search` | `title` (string, optional)<br>`author` (string, optional)<br>`category` (int, optional)<br>`page` (int, optional)<br>`limit` (int, optional) | Search books |
| POST | `/books/:id/cover` | Path: `id` (int, required)<br>Form-data: `cover` (file, required) | Upload or replace book cover |

### 📝 Reviews

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/books/:bookId/reviews` | Path: `bookId` (int, required) | Get all reviews for a book |
| POST | `/books/:bookId/reviews` | Path: `bookId` (int, required)<br>Body: `rating` (int, required)<br>`comment` (string, required)<br>`userId` (int, required) | Add review for a book |
| PUT | `/reviews/:id` | Path: `id` (int, required)<br>Body: `rating` (int, optional)<br>`comment` (string, optional) | Update review |

### 🏷️ Categories

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/categories` | None | Get all categories |
| POST | `/categories` | `name` (string, required)<br>`description` (string, required) | Create a new category |
| GET | `/categories/:id` | Path: `id` (int, required) | Get category by ID with associated books |
| PUT | `/categories/:id` | Path: `id` (int, required)<br>Body: `name` (string, optional)<br>`description` (string, optional) | Update category |
| DELETE | `/categories/:id` | Path: `id` (int, required) | Delete category |

### 🏢 Publishers

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/publishers` | None | Get all publishers |
| POST | `/publishers` | `name` (string, required)<br>`email` (string, required)<br>`establishedYear` (int, required)<br>`streetAddress` (string, required)<br>`city` (string, required)<br>`province` (string, required)<br>`postalCode` (string, required) | Create publisher |
| GET | `/publishers/:id` | Path: `id` (int, required) | Get publisher by ID with published books |
| PUT | `/publishers/:id` | Path: `id` (int, required)<br>Body: `name` (string, optional)<br>`email` (string, optional)<br>`establishedYear` (int, optional)<br>`addressId` (int, optional) | Update publisher |
| DELETE | `/publishers/:id` | Path: `id` (int, required) | Delete publisher |

### 🏷️ Authors

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/authors` | None | Get all authors |
| POST | `/authors` | `firstName` (string, required)<br>`lastName` (string, required)<br>`biography` (string, required)<br>`birthDate` (string (YYYY-MM-DD), required)<br>`nationalityId` (int, required) | Create a new author |
| GET | `/authors/:id` | Path: `id` (int, required) | Get author by ID with their books |
| PUT | `/authors/:id` | Path: `id` (int, required)<br>Body: `firstName` (string, optional)<br>`lastName` (string, optional)<br>`biography` (string, optional)<br>`birthDate` (string, optional)<br>`nationalityId` (string, optional) | Update author |
| DELETE | `/authors/:id` | Path: `id` (int, required) | Delete author |

---

## 🔑 Authentication Flow

**Register → Login → Receive JWT**

Include JWT in header for protected routes:

```
Authorization: Bearer <token>
```

---

## 🛠️ Technologies Used

- **Node.js** + **Express**
- **MySQL** with foreign keys and indexing
- **JWT Authentication**
- **bcrypt** for password hashing
- **Multer** for file uploads

---

## 👨‍💻 Development

Run in development mode:

```bash
npm run start:dev
```

Run in production mode:

```bash
npm start
```

---

##  Additional Documentation

This repository includes comprehensive documentation to help you get started:

- **🗄️ Database Schema:** Complete SQL schema file (`book_management_api.sql`) with all tables, relationships, and constraints
- **📊 ER Diagram:** Visual database relationship diagram showing the complete data model
- **📮 Postman Collection:** Ready-to-use API request collection for testing all endpoints
- **📁 Location:** All documentation files are available in the [`docs/`](./docs) folder

> 💡 **Quick Start Tip:** Import the Postman collection and set up the database using the provided schema file to get up and running quickly!

## ⚠️ Notes

- Passwords are hashed using **bcrypt**.
- Book cover uploads are stored in `uploads/book-covers/`.
- Use `.env` for easy configuration.
