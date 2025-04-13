from fastapi import APIRouter
from models.ai_models import AIRequest, AIResponse
from services.ai_service import generate_response
from services.langchain_service import answer_question
import os
from config import AI_CONFIG

USE_AI = os.getenv("USE_AI", "false").lower() == "true"

router = APIRouter()

@router.post(
    "/ai",
    response_model=AIResponse,
    summary="Ask AI to analyze sales rep data",
    description="""
    This endpoint allows you to ask freeform natural language questions about your sales rep data.

    The request is processed using LangChain with a pandas agent that analyzes a structured DataFrame
    created from `dummyData.json`.

    ### Example questions:
    - "Which region has the most total sales?"
    - "Who has the most clients?"
    - "Average number of deals per rep?"
    """,
    tags=["AI"]
)
async def ask_ai(request: AIRequest) -> AIResponse:
    """
    Accepts a question string and uses a LangChain-powered agent to analyze dummy sales rep data.

    Args:
        request (AIRequest): The request body containing a 'question' string.

    Returns:
        AIResponse: The AI-generated answer to the question based on the dataset.
    """
    if not USE_AI:
        return AIResponse(answer="AI feature is currently disabled.")
    
    answer = await answer_question(request.question)
    return AIResponse(answer=answer)
    
@router.get("/ai/info", tags=["AI Info"])
def get_ai_config():
    return {
        "model": AI_CONFIG["model"],
        "provider": AI_CONFIG["provider"]
    }