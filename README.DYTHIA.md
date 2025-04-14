# Coding Challenge: 
## Sales Dashboard with Next.js & FastAPI

Overview:
---------
This is a full-stack coding challenge aimed at building a simple sales dashboard application.
The project utilizes Next.js for the frontend and FastAPI for the backend. 
It processes and displays nested sales data from a provided JSON file.
Also utilize AI to analyze data in dummyData.json

Tech Stack:
-----------
- Frontend: Next.js
- Backend: FastAPI
- Data: 'dummyData.json' containing sales-related information
- AI integration with Langchain
- AI Provider: openrouter 
- AI MODEL: mistralai/mixtral-8x7b-instruct
- Containerization: Docker (with provided scripts for development)

# ------------------------------
# Getting Started:

Prerequisites:
- Docker installed on your machine.

Setup Instructions:
1. Clone the Repository:
    git clone https://github.com/dythia102/coding-test.git
    cd coding-test

    cp backend/.env.template backend/.env (read manual how to generate API Key)
    cp frontend/.env.template frontend/.env.local

2. Start the Backend:
    bash scripts/run-backend-docker.sh 

3. Start the Frontend:
    bash scripts/run-frontend-npminstall-docker.sh 
    bash scripts/run-frontend-docker.sh

4. Access the Application:
   - Frontend: http://localhost:3000
   - Backend API Docs: http://localhost:8000/docs or
   - http://localhost:8000/redoc
   - Backend API: http://localhost:8000/api/sales-reps

5. Deploy using ngrok
   - docker compose -f docker-compose.ngrok.yml up -d
=============================================
AI Feature - API Key Setup Manual 
================
This guide explains how to set up the API key required
to enable the AI feature in the backend (FastAPI).

--------------------------------------------------
Step 1: Get Your API Key
--------------------------------------------------
1. Visit one of the following platforms:
   - https://openrouter.ai
   - https://platform.openai.com/account/api-keys
2. Sign in and generate your API key.
3. Copy the API key to use in the next step.

--------------------------------------------------
Step 2: Add API Key to Environment
--------------------------------------------------
1. In the 'backend' directory, create a file named:
   .env

2. Add the following content in backend/.env:
   AI_API_KEY=your-api-key-here
   AI_API_BASE=https://openrouter.ai/api/v1


===========================================
Backend API List - FastAPI 
===========================================

Base URL:
---------
http://localhost:8000

--------------------------------------------------
1. GET /api/sales-reps
--------------------------------------------------
Description:
- Returns a list of sales representatives.
- Supports filtering, sorting, and pagination.

Method:
- GET

Query Parameters (optional):
- name: filter by name
- region: filter by region
- skill: filter by skill
- page: page number (default: 1)
- size: items per page (default: 10)
- sort_by: field name to sort (e.g., name, score)
- sort_order: asc | desc

Example:
GET /api/sales-reps?region=Asia&skill=negotiation&page=2&size=5

--------------------------------------------------
2. GET /api/sales-reps/filters
--------------------------------------------------
Description:
- Returns possible filter options (e.g., list of regions, skills)

Method:
- GET

Example:
GET /api/sales-reps/filters

--------------------------------------------------
3. POST /ai
--------------------------------------------------
Description:
- Accepts a question and returns an AI-generated answer.

Method:
- POST

Request Body:
{
  "question": "string"
}

Example:
POST /ai
Body:
{
  "question": "How many top performers are in Europe?"
}

--------------------------------------------------
4. GET /docs
--------------------------------------------------
Description:
- OpenAPI auto-generated documentation for testing endpoints.

Method:
- GET

Example:
http://localhost:8000/docs

--------------------------------------------------
5. GET /redoc
--------------------------------------------------
Description:
- ReDoc alternative documentation UI.

Method:
- GET

Example:
http://localhost:8000/redoc

--------------------------------------------------
Note:
- All endpoints are asynchronous.
- JSON format is used for requests and responses.
- Pagination metadata is included in response headers.
