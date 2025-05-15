FROM nvidia/cuda:12.2.0-base-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install -y \
    python3-pip python3-dev git curl && \
    rm -rf /var/lib/apt/lists/*

RUN pip3 install --upgrade pip && pip3 install \
    jupyterlab \
    numpy \
    pandas \
    torch \
    langchain \
    openai \
    faiss-cpu \
    tiktoken

CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--no-browser", "--allow-root"]
