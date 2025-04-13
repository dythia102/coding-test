from pydantic import BaseModel, Field

class AIRequest(BaseModel):
    question: str = Field(..., example="Which region has the highest sales?")

class AIResponse(BaseModel):
    answer: str = Field(..., example="The West region has the highest total sales at $320,000.")
