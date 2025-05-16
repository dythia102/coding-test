# RAG Jupyter GPU Dev Environment

This repo contains a research/development scaffold for Retrieval-Augmented Generation (RAG) using Langchain, and PyTorch in a GPU-enabled Jupyter environment.

this Dockerfile env utilize GPU, so if you dont dont have it, you might want to adjust it to use CPU only, but i havent tested it
## Setup


jupyterlab
numpy
pandas
torch
langchain
openai
faiss-cpu
sentence-transformers
tiktoken
PyMuPDF
pdfplumber
unstructured
chromadb
python-dotenv
matplotlib
jupyter
notebook
jupyterlab notebook
matplotlib
langchain_community
seaborn

```bash
docker compose -f docker-compose.jupyter.yml build
docker compose -f docker-compose.jupyter.yml up
```
