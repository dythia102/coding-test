import json
import pandas as pd
from langchain.chat_models import ChatOpenAI
from langchain_experimental.agents import create_pandas_dataframe_agent
from langchain.agents.agent_types import AgentType

from config import AI_CONFIG

# Load and flatten dummy sales rep data
with open("dummyData.json") as f:
    raw_data = json.load(f)["salesReps"]

rows = []
for rep in raw_data:
    total_deals = sum(deal["value"] for deal in rep["deals"])
    rows.append({
        "name": rep["name"],
        "region": rep["region"],
        "role": rep["role"],
        "skills": ", ".join(rep["skills"]),
        "total_deals": total_deals,
        "num_clients": len(rep["clients"]),
    })

df = pd.DataFrame(rows)

# Build the LangChain agent using config from .env
llm = ChatOpenAI(
    temperature=0,
    model=AI_CONFIG["model"],
    openai_api_base=AI_CONFIG["api_base"],
    openai_api_key=AI_CONFIG["api_key"]
)

agent = create_pandas_dataframe_agent(
    llm,
    df,
    verbose=True,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    allow_dangerous_code=True,
    handle_parsing_errors=True,
)

# Endpoint logic for answering user questions
async def answer_question(question: str) -> str:
    response = agent.run(question)
    return str(response)
