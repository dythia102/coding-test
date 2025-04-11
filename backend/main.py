from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
from pydantic import BaseModel
import uvicorn
import json

from api import ai, sales_reps, exception_handlers
from api.exception_handlers import add_exception_handlers

app = FastAPI(
    title="Coding Test FastAPI App",
    description="Basic async FastAPI boilerplate",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: NOSONAR Change to specific origins in production 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai.router, prefix="/api")
app.include_router(sales_reps.router, prefix="/api")

add_exception_handlers(app)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
