# VDR App — MERN Stack Project

This is a **Video Deal Room (VDR) application** built with the MERN stack:

- **MongoDB** — database
- **Express.js** — backend framework
- **React.js (Vite)** — frontend framework
- **Node.js** — server environment

✅ Features:
- User registration and login (buyer / seller roles)
- Create deals (buyers select sellers)
- Seller can update deal status (Pending / In Progress / Completed / Cancelled)
- Token-based authentication with JWT
- Seller selection dropdown
- (Planned) File upload for deals
- (Planned) Buyer-seller chat

---

## 📂 Project structure

vdr-app/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
├── frontend/
│ ├── src/
│ ├── vite.config.js
│ └── ...
└── README.md

---

## ⚙️ How to run the app

### 1 Clone the repository
```bash
git clone https://github.com/1205Parth/vdr-app
cd vdr-app

2️ Setup backend

cd backend
npm install

** Create a .env file in backend/:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Then run:

npm run dev

➡ Your backend runs at http://localhost:5000

3️ Setup frontend

cd ../frontend
npm install
npm run dev

➡ Your frontend runs at http://localhost:5173



🛠 Tech stack
React + Vite

Node + Express

MongoDB + Mongoose

JWT authentication

Axios

Socket.io (planned for chat)

Roadmap
➡ Register & Login

➡ Deal creation + seller selection

➡ Deal status update

 File/document upload

 Buyer-seller chat

 Payment integration

 🙌 Contributing
Pull requests are welcome!
Please open an issue first to discuss changes.








