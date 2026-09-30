# AI Code Review Platform

An AI-powered code review application built using the MERN stack and Ollama.

## Features

- Review code instantly
- Detect bugs and bad practices
- Suggest improvements
- Generate improved code
- Local AI using Ollama (No API key required)
- Clean and responsive UI

## Tech Stack

### Frontend
- React
- Vite
- Axios
- Prism.js

### Backend
- Node.js
- Express.js
- Axios

### AI
- Ollama
- qwen2.5-coder:3b
- qwen2.5-coder:7b
- llama3.2

## Project Structure

```
ai-code-review/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers
│   │   ├── routes
│   │   ├── services
│   │   └── app.js
│   ├── server.js
│   └── package.json
```

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/ai-code-review.git
cd ai-code-review
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Install Ollama

Download Ollama:

https://ollama.com

Install models:

```bash
ollama pull qwen2.5-coder:3b
ollama pull qwen2.5-coder:7b
```

Start Ollama:

```bash
ollama serve
```

## Usage

1. Start Ollama.
2. Start the backend.
3. Start the frontend.
4. Paste your source code.
5. Click **Review**.
6. View AI-generated feedback.

## Future Improvements

- Authentication
- Review history
- Multiple programming languages
- Download review as PDF
- Dark/Light theme
- Syntax highlighting improvements

## Author

**Rachit Tripathi**

GitHub: https://github.com/rachit1807