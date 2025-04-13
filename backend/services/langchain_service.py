import json
import pandas as pd
from langchain.chat_models import ChatOpenAI
from langchain_experimental.agents import create_pandas_dataframe_agent
from langchain.agents.agent_types import AgentType
from dotenv import load_dotenv
import os

load_dotenv()

with open("dummyData.json") as f:
    raw_data = json.load(f)["salesReps"]

# Flatten rep data into a flat table
rows = []
for rep in raw_data:
    total_deals = sum(deal["value"] for deal in rep["deals"])
    rows.append({
        "name": rep["name"],
        "region": rep["region"],
        "role": rep["role"],
        "skills": ", ".join(rep["skills"]),
        "total_deals": total_deals,
        "num_clients": len(rep["clients"])
    })

df = pd.DataFrame(rows)

# llm = ChatOpenAI(temperature=0, model="gpt-4o-mini")

llm = ChatOpenAI(
    temperature=0,
    model="mistralai/mixtral-8x7b-instruct",  # or other supported OpenRouter model
    openai_api_base="https://openrouter.ai/api/v1",
    openai_api_key=os.getenv("OPENROUTER_API_KEY")
)

agent = create_pandas_dataframe_agent(
    llm,
    df,
    verbose=True,
    agent_type="zero-shot-react-description",  # or AgentType.ZERO_SHOT_REACT_DESCRIPTION
    allow_dangerous_code=True,
    handle_parsing_errors=True  # 👈 this tells the agent to recover and retry
)


async def answer_question(question: str) -> str:
    response = agent.run(question)
    return str(response)
