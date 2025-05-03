from fastapi import APIRouter, FastAPI
from config import GIT_SHA, APP_METADATA, ENV
import os


router = APIRouter()

@router.get("/meta", tags=["Meta"])
def get_meta():
    return {
        "version": APP_METADATA["version"],
        "env": ENV,
        "git_sha": GIT_SHA,
        "title": APP_METADATA["title"],
        "description": APP_METADATA["description"],
    }
