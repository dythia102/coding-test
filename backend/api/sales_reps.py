from fastapi import APIRouter
from models.sales_rep_models import SalesRepsResponse
import json

router = APIRouter()

# Load dummy data at startup
with open("dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

@router.get(
    "/sales-reps",
    response_model=SalesRepsResponse,
    summary="Get Dummy Data",
    description="Returns dummy user data loaded from a local JSON file."
)
async def get_data() -> SalesRepsResponse:
    """
    Fetch dummy data from a local JSON file and return it directly.

    Returns:
        JSONResponse: Raw dummy data as-is (no response validation).
    """
    return DUMMY_DATA
