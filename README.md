# **README.md**

## **ZilBiz - AI-Driven Web Portal for SMEs**

ZilBiz is a full-stack web application developed to empower Small and Medium Enterprises (SMEs) in Mauritius. It provides secure business listings, review management, and basic real-time interaction via chatbot integration. The project features a React-based frontend and a Node.js backend with MongoDB as the primary database. This README provides setup instructions strictly focused on **development and execution**.


---

## ⚙️ **System Requirements**

- **Node.js:** v16 or higher  
- **npm:** v7 or higher  
- **MongoDB:** Local or MongoDB Atlas instance  
- **Operating System:** Windows 10 / macOS / Ubuntu  
- **Browser:** Chrome, Firefox, Edge (for frontend)

---

## 📦 **Backend Setup (Node.js/Express)**

1. **Navigate to the backend directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```



## 🧠 **Key Packages**

### Backend (Node.js)
- `express`
- `mongodb`
- `dotenv`
- `jsonwebtoken`
- `bcryptjs`
- `cors`
- `helmet`
- `cookie-parser`
- `ws` (WebSocket)

### Frontend (React.js)
- `react`
- `react-router-dom`
- `axios`
- `jwt-decode`
- `react-google-recaptcha`

---

## 🔐 **Ports and Services**

| **Service**         | **Port** |
|---------------------|----------|
| Backend API         | 5004     |
| Frontend (React)    | 5003     |
| WebSocket (Chatbot) | `/ws` path via port 5003 |

---

## ⚠️ **Important Notes**

- Ensure MongoDB is running locally or on Atlas.
- WebSocket functionality is handled via the backend (`/ws` route).
- Chatbot is operational but AI logic is a future enhancement.
- All secret keys are in the .env file.

---

## ✅ **Quick Run Recap**

```bash
# Backend
cd server
npm install
node src/server.js
# Frontend (in separate terminal)
cd client
npm install
npm start
```

---

## 👨‍💻 Developer

**Name:** Alfred Moyo   
**University:** Middlesex University  

