from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import ai, sales_reps
from config import CORS_CONFIG, APP_METADATA
from api.exception_handlers import add_exception_handlers
from api import meta  
from api.debug import register_debug_router  

app = FastAPI(**APP_METADATA)

app.add_middleware(
    CORSMiddleware,
    **CORS_CONFIG
)

# Test hot reload
app.include_router(ai.router, prefix="/api")
app.include_router(sales_reps.router, prefix="/api")
app.include_router(meta.router, prefix="/api")
register_debug_router(app)
add_exception_handlers(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
