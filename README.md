# 🏥 Hospital Management REST API

A beginner-friendly Full Stack **Hospital Management System** built using **React, Express.js, SQLite (better-sqlite3)**, and **Vite**. The application allows users to add, view, search, update, and delete patient records through a REST API.

---

# 📌 Project Overview

This project demonstrates how to build a complete CRUD (Create, Read, Update, Delete) application using React for the frontend and Express with SQLite for the backend.

The application stores patient information in a SQLite database and provides REST API endpoints for managing hospital records.

---

# 🚀 Features

- ➕ Add New Patient
- 📋 View All Patients
- 🔍 Search Patient by Name or Gender
- 📄 Pagination (5 records per page)
- ✏ Edit Patient Details
- ❌ Delete Patient
- 🌙 Dark Mode
- 🔢 Live Character Counter (Name - Max 40 Characters)
- 📱 Phone Number Validation (10 Digits)
- ⏳ Loading Indicator
- 🕒 Last Updated Timestamp
- 👤 Avatar with Patient Initials
- 💾 SQLite Database
- 📡 REST API
- 🧪 Postman Collection Included

---

# 🛠 Technologies Used

## Frontend

- React
- Vite
- CSS3
- Fetch API

## Backend

- Node.js
- Express.js
- CORS
- better-sqlite3
- SQLite

## Tools

- Postman
- Visual Studio Code

---

# 📂 Project Structure

```text
Project Folder
│
├── backend
│   └── server
│       ├── index.js
│       ├── package.json
│       └── data.db
│
├── frontend
│   └── apiDemo
│       ├── src
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       └── package.json
│
└── postman
    ├── Hospital-Management-API.postman_collection.json
    └── Hospital-Mangement.postman_environment.json
```

---

# ⚙ Installation

## Backend

Open Terminal

```bash
cd backend/server
```

Install dependencies

```bash
npm install
```

Run server

```bash
node index.js
```

Server runs at

```text
http://localhost:5000
```

---

## Frontend

Open another terminal

```bash
cd frontend/apiDemo
```

Install dependencies

```bash
npm install
```

Start React

```bash
npm run dev
```

Frontend runs at

```text
http://localhost:5173
```

---

# 🗄 Database

Database Name

```text
data.db
```

Table Name

```text
Hospital
```

Columns

| Column | Type |
|---------|------|
| id | Integer |
| name | Text |
| age | Integer |
| Gender | Text |
| phone | Text |
| Adress | Text |
| DOF | Text |
| registered_at | Text |

---

# 📡 API Endpoints

## Create Patient

```http
POST /Hospital
```

Required Fields

- Name
- Age
- Gender
- Phone
- Address
- DOF

---

## Get All Patients

```http
GET /hospital
```

Supports

- Pagination
- Search

Example

```text
GET /hospital?page=1&limit=5
```

---

## Get Patient By ID

```http
GET /hospital/:id
```

---

## Update Patient

```http
PUT /hospital/:id
```

---

## Delete Patient

```http
DELETE /hospital/:id
```

---

# 📄 Sample Patient Record

```json
{
  "id": 1,
  "name": "Rahul",
  "age": 25,
  "Gender": "Male",
  "phone": "9876543210",
  "Adress": "Belagavi",
  "DOF": "2026-07-07",
  "registered_at": "2026-07-07T10:30:00.000Z"
}
```

---

# 📱 Frontend Features

- Patient Registration Form
- Live Name Character Counter
- Phone Number Validation
- Search Box
- Pagination
- Edit Button
- Delete Button
- Avatar Circle
- Loading Indicator
- Last Updated Time
- Dark Mode

---

# 📬 Postman Testing

Import the following files into Postman.

```
Hospital-Management-API.postman_collection.json
Hospital-Mangement.postman_environment.json
```

Environment Variable

```
base_url = http://localhost:5000
```

---

# 🎯 Learning Outcomes

This project helps understand:

- REST API Development
- CRUD Operations
- Express Routing
- SQLite Database
- better-sqlite3
- React Hooks
- API Integration
- Pagination
- Search Functionality
- Form Validation
- Dark Mode
- Postman API Testing

---

# 👨‍💻 Author

**Hospital Management REST API Project**

Developed using **React + Express + SQLite (better-sqlite3)** for learning Full Stack Web Development.

---

# 📄 License

This project is created for **educational and learning purposes only**.
