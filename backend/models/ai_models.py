from pydantic import BaseModel

# Pydantic models
class AIRequest(BaseModel):
    question: str

class AIResponse(BaseModel):
    answer: str
