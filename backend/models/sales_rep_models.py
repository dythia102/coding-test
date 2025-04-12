from typing import List
from pydantic import BaseModel, Field
from typing import List, Optional, Literal

class Deal(BaseModel):
    client: str
    value: int
    status: str

class Client(BaseModel):
    name: str
    industry: str
    contact: str

class SalesRep(BaseModel):
    id: int
    name: str
    role: str
    region: str
    skills: List[str]
    deals: List[Deal]
    clients: List[Client]

class SalesRepsMeta(BaseModel):
    total: int
    page: int
    page_size: int

class SalesRepsResponse(BaseModel):
    salesReps: List[SalesRep]
    meta: SalesRepsMeta

class SalesRepsFilter(BaseModel):
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=10, ge=1, le=100)
    sort_by: Optional[Literal["name", "region", "role"]] = None
    sort_order: Literal["asc", "desc"] = "asc"
    regions: Optional[List[str]] = None
    roles: Optional[List[str]] = None  
    client_names: Optional[List[str]] = None
    client_industries: Optional[List[str]] = None
    search_term: Optional[str] = None