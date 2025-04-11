cd backend

docker run -it --rm -p 8000:8000 -v "$(pwd)":/app -v "$(pwd)/../dummyData.json":/app/dummyData.json -w /app python:alpine sh

# then execute this inside container
#> pip install -r requirements.txt
#> uvicorn main:app --host 0.0.0.0 --port 8000 --reload
