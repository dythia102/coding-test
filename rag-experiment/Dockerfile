FROM nvidia/cuda:12.2.0-base-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /workspace

# Install Python and system tools
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv git curl wget \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && pip3 install --upgrade pip \
    && apt-get clean

# Copy requirements.txt first (to cache pip install)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install jupyter
RUN pip install notebook
RUN pip install jupyterlab notebook
RUN pip install matplotlib
RUN python -m ipykernel install --sys-prefix
RUN pip install langchain_community
RUN pip install seaborn

# Copy the rest of the source code
COPY . .

# Launch Jupyter Notebook
CMD ["jupyter", "lab", "--ip=0.0.0.0", "--port=8888", "--allow-root", "--NotebookApp.token=''", "--NotebookApp.password=''", "--ServerApp.disable_check_xsrf=True"]
