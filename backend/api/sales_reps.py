from fastapi import APIRouter, Query, Depends
from models.sales_rep_models import SalesRepsResponse, SalesRepsFilter
from models.sales_rep_models import SalesStatsResponse, TopRepStat
from typing import Dict, List, Optional
from starlette.exceptions import HTTPException as StarletteHTTPException
from models.sales_rep_models import SalesRep
import json
import time

FILTER_CACHE = None
FILTER_CACHE_TTL = 300  # seconds
FILTER_CACHE_TIMESTAMP = 0

STATS_CACHE = None
STATS_CACHE_TTL = 300  # seconds
STATS_CACHE_TIMESTAMP = 0

router = APIRouter()

# Load dummy data at startup
with open("dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

@router.get(
    "/sales-reps",
    response_model=SalesRepsResponse,
    summary="List Sales Reps with Filters",
    description="Returns dummy sales reps data with support for search, filtering by region, clients, and sorting."
)
async def get_data(
    page: int = Query(1, ge=1, description="Page number (1-indexed)"),
    page_size: int = Query(10, ge=1, le=100, description="Items per page"),
    sort_by: Optional[str] = Query(None, description="Sort field (name, region, role)"),
    sort_order: str = Query("asc", pattern="^(asc|desc)$", description="Sort order: asc or desc"),
    regions: Optional[List[str]] = Query(None, description="Filter by one or more regions"),
    roles: Optional[List[str]] = Query(None, description="Filter by one or more roles"),  
    client_names: Optional[List[str]] = Query(None, description="Filter by one or more client names"),
    client_industries: Optional[List[str]] = Query(None, description="Filter by one or more industries"),
    search_term: Optional[str] = Query(None, description="Search in name or skills (case-insensitive)")
) -> SalesRepsResponse:
    """
    Returns filtered and paginated sales representatives with support for sorting and search.
    """
    filter = SalesRepsFilter(
        page=page,
        page_size=page_size,
        sort_by=sort_by,
        sort_order=sort_order,
        regions=regions,
        roles=roles,
        client_names=client_names,
        client_industries=client_industries,
        search_term=search_term
    )

    data = DUMMY_DATA["salesReps"]

    if filter.search_term:
        term = filter.search_term.lower()
        data = [
            rep for rep in data
            if term in rep["name"].lower()
            or any(term in skill.lower() for skill in rep.get("skills", []))
        ]
    
    if filter.roles:
        data = [
            rep for rep in data
            if rep["role"].lower() in map(str.lower, filter.roles)
        ]

    if filter.regions:
        data = [rep for rep in data if rep["region"].lower() in map(str.lower, filter.regions)]

    if filter.client_names or filter.client_industries:
        filtered_data = []
        for rep in data:
            for client in rep.get("clients", []):
                if filter.client_names and any(name.lower() in client["name"].lower() for name in filter.client_names):
                    filtered_data.append(rep)
                    break
                if filter.client_industries and any(ind.lower() in client["industry"].lower() for ind in filter.client_industries):
                    filtered_data.append(rep)
                    break
        data = filtered_data

    if filter.sort_by:
        reverse = filter.sort_order == "desc"
        data.sort(key=lambda x: x.get(filter.sort_by, ""), reverse=reverse)

    start = (filter.page - 1) * filter.page_size
    end = start + filter.page_size
    paginated_data = data[start:end]

    return SalesRepsResponse(
        salesReps=paginated_data,
        meta={
            "total": len(data),
            "page": filter.page,
            "page_size": filter.page_size
        }
    )

@router.get(
    "/sales-reps/filters",
    summary="Get available filter options",
    description="Returns distinct values for fields like region, role, and client industry. Useful for populating dropdowns or filters in the frontend.",
    response_model=Dict[str, List[str]]
)
async def get_filter_options():
    """
    Retrieve distinct filterable values from the sales reps dataset, excluding client names for performance reasons.

    Results are cached in memory for 5 minutes.
    """
    global FILTER_CACHE, FILTER_CACHE_TIMESTAMP

    current_time = time.time()
    if FILTER_CACHE and (current_time - FILTER_CACHE_TIMESTAMP) < FILTER_CACHE_TTL:
        return FILTER_CACHE

    data = DUMMY_DATA["salesReps"]

    regions = sorted(set(rep["region"] for rep in data))
    roles = sorted(set(rep["role"] for rep in data))
    industries = sorted({
        client["industry"]
        for rep in data
        for client in rep.get("clients", [])
    })

    FILTER_CACHE = {
        "regions": regions,
        "roles": roles,
        "industries": industries
    }
    FILTER_CACHE_TIMESTAMP = current_time

    return FILTER_CACHE

@router.get(
    "/sales-reps/stats",
    response_model=SalesStatsResponse,
    summary="Sales Stats Summary",
    description="Returns summary statistics about sales reps and their deal performance."
)
async def get_sales_stats() -> SalesStatsResponse:
    global STATS_CACHE, STATS_CACHE_TIMESTAMP

    current_time = time.time()
    if STATS_CACHE and (current_time - STATS_CACHE_TIMESTAMP) < STATS_CACHE_TTL:
        return STATS_CACHE

    data = DUMMY_DATA["salesReps"]
    stats = []
    total_sales = 0

    for rep in data:
        total = sum(deal["value"] for deal in rep.get("deals", []))
        stats.append({
            "id": rep["id"],
            "name": rep["name"],
            "total_sales": total
        })
        total_sales += total

    stats.sort(key=lambda x: x["total_sales"], reverse=True)

    result = SalesStatsResponse(
        total_sales_value=total_sales,
        average_sales_per_rep=round(total_sales / len(stats), 2) if stats else 0,
        top_rep=TopRepStat(**stats[0]) if stats else None,
        top_5_reps=[TopRepStat(**rep) for rep in stats[:5]]
    )

    STATS_CACHE = result
    STATS_CACHE_TIMESTAMP = current_time

    return result

@router.get(
    "/sales-reps/{id}",
    response_model=SalesRep,
    summary="Get Sales Rep by ID",
    description="Returns a single sales rep by ID from dummy data."
)
async def get_sales_rep_by_id(id: int) -> SalesRep:
    for rep in DUMMY_DATA["salesReps"]:
        if rep["id"] == id:
            return SalesRep(**rep)

    raise StarletteHTTPException(status_code=404, detail="Sales rep not found")
