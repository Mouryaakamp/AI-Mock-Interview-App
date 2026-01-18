# Mock Interview Backend

Express.js backend API for the Mock Interview application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string and Gemini API key:
```
MONGO_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

4. Start the development server:
```bash
npm run dev
```

Or start in production mode:
```bash
npm start
```

The server will be available at `http://localhost:5000`

## API Endpoints

- `POST /api/interview` - Create a new interview
- `GET /api/interview/:id` - Get interview by ID
- `POST /api/interviews` - Get all interviews by user
- `POST /api/userAnswer` - Save user answer
- `GET /api/feedback/:id` - Get feedback by interview ID
- `POST /api/gemini/generate` - Generate interview questions
- `POST /api/gemini/feedback` - Generate feedback for user answer
