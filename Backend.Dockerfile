FROM python:alpine

WORKDIR /app

COPY ./backend/requirements.txt /app/requirements.txt

RUN echo "Contents of /app:" && ls -l /app
RUN echo "Current directory:" && pwd

RUN more requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
