from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR
from typing import Any

def add_exception_handlers(app: FastAPI) -> None:
    """
    Registers global exception handlers to the FastAPI app.

    Args:
        app (FastAPI): The FastAPI application instance.
    """

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
        if exc.status_code == 404:
            return JSONResponse(
                status_code=404,
                content={"detail": exc.detail or "Not found."}
            )
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": "An error occurred."}
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        return JSONResponse(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Internal server error."}
        )
