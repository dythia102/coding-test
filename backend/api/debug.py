from fastapi import APIRouter, FastAPI
import os
from config import CORS_CONFIG  # Import your CORS_CONFIG

router = APIRouter()

@router.get("/debug/config", tags=["Debug"])
def get_debug_config():
    env_vars = dict(os.environ)
    masked_vars = {
        key: ("****" if key == "AI_API_KEY" else value) 
        for key, value in env_vars.items()
    }

    return {
        "app_metadata": app.extra,
        "routes": [
            {
                "path": route.path,
                "methods": list(route.methods),
                "name": route.name
            } for route in app.routes
        ],
        "middleware": [str(middleware.cls) for middleware in app.user_middleware],
        "environment_variables": masked_vars,
        "cors_config": CORS_CONFIG,  # Include CORS_CONFIG
    }

def register_debug_router(application: FastAPI):
    global app
    app = application
    app.include_router(router, prefix="/api")
