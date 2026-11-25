# 🤖 AI Code Review Platform

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success?logo=mongodb)
![Ollama](https://img.shields.io/badge/AI-Ollama-black)
![License](https://img.shields.io/badge/License-MIT-yellow)

</p>

---

# 📖 Overview

AI Code Review Platform is an intelligent web application that helps developers improve the quality of their code by generating AI-powered code reviews.

Instead of manually reviewing every line of code, users can simply paste their source code into the editor and receive a structured review containing suggestions, improvements, detected issues, best practices, readability feedback, and an overall quality assessment.

The project uses **React.js** for the frontend, **Node.js + Express.js** for the backend, **MongoDB** for user management, and **Ollama (Llama 3.2)** as the local Large Language Model (LLM) to generate code reviews.

This project demonstrates full-stack web development, REST APIs, authentication, AI integration, responsive UI design, and software engineering best practices.

---

# ✨ Features

### 🤖 AI Code Review

- AI-generated code review
- Detects code smells
- Suggests improvements
- Reviews readability
- Reviews maintainability
- Reviews performance
- Reviews coding standards
- Gives quality score

---

### 💻 Smart Code Editor

- Paste source code
- Supports multiple programming languages
- Clean editing interface
- Fast review generation

---

### 📄 PDF Report

- Download AI review as PDF
- Share review easily
- Clean formatting

---

### 👤 Authentication

- User Registration
- User Login
- JWT Authentication
- Secure password hashing using bcrypt

---

### 🎨 Modern UI

- Responsive Design
- Clean Interface
- Dark Theme
- Professional Layout
- Markdown formatted AI responses

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Markdown
- PrismJS
- jsPDF

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## AI

- Ollama
- Llama 3.2
- Local LLM Inference

---

# 📂 Folder Structure

```text
AI-Code-Review
│
├── backend
│   ├── src
│   │
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── app.js
│   └── server.js
│
├── frontend
│   ├── src
│   ├── assets
│   ├── public
│   ├── components
│   └── App.jsx
│
├── README.md
└── .gitignore
```

---

# ⚙️ System Architecture

```text
                 User
                   │
                   ▼
          React Frontend (Vite)
                   │
           Axios HTTP Requests
                   │
                   ▼
          Express.js Backend API
                   │
             AI Controller
                   │
                   ▼
        Ollama (Llama 3.2 Model)
                   │
                   ▼
         AI Generated Review
                   │
                   ▼
        Markdown Response to User
```

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/rachit1807/AI-Code-Review.git

cd AI-Code-Review
```

# 🌐 Deploy on Render

The repository includes a Render Blueprint that builds the Vite frontend and serves it from the Express backend as one web service. Create a Blueprint in Render from this repository and Render will ask for the service settings declared in `render.yaml`.

The Blueprint uses Render's free web service plan. Render may spin the service down after 15 minutes without traffic; the first request afterward can take about a minute to wake it up.

Add these values in Render's secret environment variable form:

- `MONGODB_URI`: a MongoDB Atlas connection string. Configure Atlas network access so the Render service can reach the cluster.
- `OLLAMA_BASE_URL`: the base URL of a hosted Ollama-compatible API (for example, `https://ollama.com`).
- `OLLAMA_API_KEY`: the provider API key, if required.
- `OLLAMA_MODEL`: a model name supported by that endpoint.

Render generates `JWT_SECRET` automatically. Keep provider keys and database credentials in Render's environment settings; do not commit them to this repository. The local defaults still support running the app with Ollama on `localhost:11434`.
# 🖥️ Installation Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/rachit1807/AI-Code-Review.git
cd AI-Code-Review
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3️⃣ Install Backend Dependencies

Open another terminal.

```bash
cd backend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=3000

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

> **Note:** Replace the values above with your own MongoDB connection string and JWT secret.

---

# 🤖 Install Ollama

Download Ollama from

https://ollama.com/download

After installation, verify it is installed:

```bash
ollama --version
```

---

# 📥 Download Llama 3.2 Model

```bash
ollama pull llama3.2
```

You can verify available models:

```bash
ollama list
```

Expected output:

```text
NAME
llama3.2:latest
```

---

# ▶️ Running the Project

Open **three terminals**.

## Terminal 1

Start Ollama.

```bash
ollama serve
```

---

## Terminal 2

Run Backend.

```bash
cd backend

npm start
```

Expected Output

```text
Server running on port 3000
MongoDB Connected
```

---

## Terminal 3

Run Frontend.

```bash
cd frontend

npm run dev
```

Open your browser:

```
http://localhost:5173
```

---

# 💡 How to Use

### Step 1

Register a new account.

---

### Step 2

Login using your credentials.

---

### Step 3

Paste your source code inside the editor.

---

### Step 4

Click **Review Code**.

---

### Step 5

The backend sends your code to Ollama.

---

### Step 6

Llama 3.2 analyzes your code and generates a structured review.

---

### Step 7

The review is displayed in Markdown format with suggestions and quality feedback.

---

### Step 8

Download the review as a PDF if needed.

---

# 🔄 Project Workflow

```text
User
 │
 ▼
Login / Register
 │
 ▼
React Frontend
 │
 ▼
Axios Request
 │
 ▼
Express Backend
 │
 ▼
AI Controller
 │
 ▼
Ollama API
 │
 ▼
Llama 3.2
 │
 ▼
AI Review Generated
 │
 ▼
Markdown Response
 │
 ▼
Displayed in Browser
```

---

# 🌐 API Endpoints

## Authentication

### Register

```http
POST /auth/register
```

Body

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "12345678"
}
```

---

### Login

```http
POST /auth/login
```

Body

```json
{
  "email": "john@example.com",
  "password": "12345678"
}
```

---

## AI Review

```http
POST /ai/get-review
```

Body

```json
{
  "code": "console.log('Hello World');"
}
```

Returns an AI-generated code review in Markdown format.

# ⭐ Key Features

## 🤖 AI-Powered Code Review

The application analyzes the submitted source code using **Ollama (Llama 3.2)** and generates a detailed review that includes:

- Code quality analysis
- Best practices
- Performance suggestions
- Readability improvements
- Security recommendations
- Maintainability feedback
- Bug detection
- Optimization suggestions

---

## 🔐 Authentication System

The application includes a secure authentication system.

Features include:

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- MongoDB User Storage

---

## 📄 PDF Report Generation

Users can download the AI-generated review as a professional PDF report.

The generated report includes:

- Original code
- AI Review
- Suggestions
- Code Quality Feedback

---

## 🎨 Responsive User Interface

Designed with modern UI principles.

Supports:

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

## ⚡ Fast Performance

- React + Vite
- Express Backend
- Lightweight REST APIs
- Fast AI Response
- Optimized Rendering

---

# 🧠 Challenges Faced

During development, several challenges were encountered and solved.

### AI Integration

Integrating a local Large Language Model (LLM) with the backend while maintaining efficient communication.

---

### Markdown Rendering

Displaying AI-generated markdown responses with proper formatting and syntax highlighting.

---

### PDF Generation

Generating clean and readable PDF reports from AI-generated markdown.

---

### Authentication

Implementing secure authentication using JWT and password hashing with bcrypt.

---

### Backend Architecture

Designing a modular backend with separate controllers, routes, services, and middleware for better scalability and maintainability.

---

# 🚀 Future Enhancements

The following features can be added in future versions:

- Multi-language code support
- GitHub Repository Integration
- Drag & Drop File Upload
- AI-generated Fixed Code
- Code History
- Team Collaboration
- User Profiles
- Saved Reviews
- Multiple AI Models
- Docker Support
- Deployment using Kubernetes
- CI/CD Pipeline
- Email Verification
- Password Reset
- Role-Based Authentication
- Cloud-hosted AI Models

---

# 🧪 Testing

The backend APIs were tested using **Postman**.

Verified Endpoints:

- User Registration
- User Login
- AI Code Review API

The frontend was tested locally using the Vite development server.

---

# 📈 Performance

The project focuses on:

- Fast UI Rendering
- Low API Response Time
- Modular Backend
- Efficient State Management
- Reusable Components

---

# 🔒 Security

Security practices implemented include:

- JWT Authentication
- Password Hashing (bcrypt)
- Environment Variables
- Secure API Design
- Input Validation

---

# 🤝 Contributing

Contributions are always welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push to GitHub.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

# 📚 Learning Outcomes

This project helped in understanding:

- React.js
- Express.js
- REST APIs
- MongoDB
- JWT Authentication
- Ollama
- LLM Integration
- API Design
- Full Stack Development
- Project Structure
- Git & GitHub
- Deployment Concepts

---
# 📜 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project for educational and personal purposes.

See the LICENSE file for more details.

---

# 👨‍💻 Author

## Rachit Tripathi

B.Tech Information Technology Student

Passionate about Full Stack Development, Artificial Intelligence, Machine Learning, and Software Engineering.

---

## 📬 Connect With Me

### GitHub

https://github.com/rachit1807

### LinkedIn

https://linkedin.com/in/rachittripathi2509

---

# 🏆 Project Highlights

✔ AI-powered Code Review

✔ React + Vite Frontend

✔ Node.js + Express Backend

✔ MongoDB Database

✔ JWT Authentication

✔ Ollama Integration

✔ Llama 3.2 Local LLM

✔ PDF Report Generation

✔ Responsive User Interface

✔ REST API Architecture

✔ Clean Modular Project Structure

✔ Git & GitHub Version Control

---

# 📊 Repository Statistics

| Category | Details |
|----------|---------|
| Project Type | Full Stack Web Application |
| Frontend | React.js + Vite |
| Backend | Node.js + Express |
| Database | MongoDB |
| Authentication | JWT |
| AI Engine | Ollama (Llama 3.2) |
| API Type | REST API |
| Language | JavaScript |
| Version Control | Git & GitHub |

---

# 🙏 Acknowledgements

Special thanks to the open-source community and the developers behind the technologies that made this project possible.

- React Team
- Vite Team
- Node.js
- Express.js
- MongoDB
- Ollama
- Meta (Llama Models)
- Tailwind CSS
- Axios
- React Markdown
- PrismJS

---

# ⭐ If You Like This Project

If you found this project useful or interesting, please consider giving it a ⭐ on GitHub.

Your support motivates me to build more open-source projects.

---

# 💡 Note

This project uses **Ollama** with the **Llama 3.2** model for local AI inference.

To use the AI-powered code review feature, ensure that:

1. Ollama is installed.
2. The Llama 3.2 model is downloaded.
3. Ollama is running before starting the backend.

Start Ollama:

```bash
ollama serve
```

Verify the model:

```bash
ollama list
```

Run the backend:

```bash
cd backend
npm start
```

Run the frontend:

```bash
cd frontend
npm run dev
```

Open the application:

```text
http://localhost:5173
```

---

# 🚀 Future Vision

The long-term vision of this project is to evolve into an intelligent developer assistant capable of:

- AI-powered bug detection
- Automatic code fixing
- Pull Request review
- GitHub integration
- Team collaboration
- Multi-model AI support
- Cloud deployment
- CI/CD integration
- Docker containerization
- Code history and analytics
- Enterprise-ready architecture

---

<p align="center">

Made with ❤️ by **Rachit Tripathi**

⭐ Thank you for visiting this repository! ⭐

</p>
