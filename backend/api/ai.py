from fastapi import APIRouter
from models.ai_models import AIRequest, AIResponse
from services.ai_service import generate_response

router = APIRouter()

@router.post("/ai", response_model=AIResponse, summary="Ask AI")
async def ai_endpoint(request: AIRequest) -> AIResponse:
    """
    Accepts a user question and returns a placeholder AI response.

    Args:
        request (AIRequest): FastAPI request containing JSON body with a 'question' field.

    Returns:
        AIResponse: Echo-style response containing the question.
    """
    return await generate_response(request)
    