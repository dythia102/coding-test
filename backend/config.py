import os
from dotenv import load_dotenv
from pathlib import Path

ENV_PATH = Path(__file__).parent / (".env" if Path(".env").exists() else ".env.production")
load_dotenv(dotenv_path=ENV_PATH)

ENV = os.getenv("ENV", "development")

def get_git_sha():
    try:
        sha = subprocess.check_output(["git", "rev-parse", "--short", "HEAD"], stderr=subprocess.DEVNULL).decode().strip()
        branch = subprocess.check_output(["git", "rev-parse", "--abbrev-ref", "HEAD"], stderr=subprocess.DEVNULL).decode().strip()
        return f"{sha} ({branch})"
    except Exception:
        return "unknown"

GIT_SHA = get_git_sha()

# ───── FastAPI Metadata ─────
APP_METADATA = {
    "title": os.getenv("APP_TITLE", "FastAPI App"),
    "description": os.getenv("APP_DESCRIPTION", "Backend service"),
    "version": os.getenv("APP_VERSION", "1.0.0"),
}

# ───── CORS ─────
CORS_ORIGINS = [os.getenv("FRONTEND_URL", "http://localhost:3000")]
CORS_CONFIG = {
    "allow_origins": CORS_ORIGINS,
    "allow_credentials": True,
    "allow_methods": ["*"],
    "allow_headers": ["*"],
}

# ───── AI / LangChain Config ─────
AI_CONFIG = {
    "provider": os.getenv("AI_PROVIDER", "openai"),
    "model": os.getenv("AI_MODEL", "gpt-4"),
    "api_key": os.getenv("AI_API_KEY"),
    "api_base": os.getenv("AI_API_BASE", "https://api.openai.com/v1"),
}


