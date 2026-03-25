# 🚀 Smart Knowledge Explorer

A full-stack web application that allows users to search and explore knowledge using real-time data fetched from external APIs, with secure authentication and personalized experience.

---

## 📌 Features

* 🔐 User Authentication (Login with JWT)
* 🛡️ Protected Routes (Only logged-in users can access)
* 🔍 Real-time Search functionality
* 🌐 Backend API integration (Flask)
* ⚡ Fast frontend using React (Vite)
* 🔄 Axios Interceptors for automatic token handling
* 🚪 Logout functionality
* 📡 External API integration (Wikipedia)

---

## 🛠️ Tech Stack

### Frontend:

* React.js (Vite)
* React Router DOM
* Axios
* JavaScript (ES6+)

### Backend:

* Flask
* Flask-JWT-Extended
* Flask-CORS
* Python

### Database:

* MongoDB

---

## 📂 Project Structure

```
Smart-Knowledge-Explorer/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│
├── backend/
│   ├── routes/
│   ├── app.py
│   ├── config.py
│   └── requirements.txt
```

---

## ⚙️ Installation & Setup

### 🔹 Clone Repository

```
git clone https://github.com/your-username/smart-knowledge-explorer.git
cd smart-knowledge-explorer
```

---

### 🔹 Backend Setup

```
cd backend
python -m venv myenv
.\myenv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt
python app.py
```

Backend will run on:

```
http://127.0.0.1:5000
```

---

### 🔹 Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

1. User logs in via frontend
2. Backend verifies credentials
3. JWT token is generated
4. Token stored in localStorage
5. Axios interceptor attaches token in every request
6. Protected routes ensure secure access

---

## 🔍 Search Flow

1. User enters query
2. React sends request to Flask API
3. Flask fetches data from external API
4. Results returned to frontend
5. UI displays title and snippet

---

## 🧠 Key Concepts Used

* REST API In
