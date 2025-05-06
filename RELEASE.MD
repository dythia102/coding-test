12 April 2005
- (BE-REQ001) The backend should serve the data from `dummyData.json` via a REST endpoint (e.g., `/api/sales-reps`). 
- (BE-REQ002) Use **FastAPI** to create an endpoint that returns the JSON data.
- (BE-REQ003) Implement CORS if needed, so the Next.js app can successfully request data from the FastAPI server.
- (BE-REQ004) Ensure your API is well-structured and documented (e.g., make use of FastAPI’s automatic docs or docstrings).
- (BE-REQ005) Add an endpoint (e.g., `/api/ai`) that accepts user input (e.g., a question) and returns a generated or placeholder response.
- Add shell script to test deployment requirement

13 April 2005
- enhance /api/sales-reps with:
    - Pagination
    - Filtering (including nested client filters)
    - Case-insensitive search
    - Sorting with allowed fields
    - Typed request/response models
    - Metadata and dynamic filter options
    - Caching for performance
    - Clean OpenAPI docs and Swagger UI
    - Test coverage with pytest, ready to automate
- add new api /api/sales-reps/filters
- add new api /api/sales-reps/stats
- add new api /api/sales-reps/{id}
- Add Langchain Integration to analyze dummyData.json

14 April 2005
- clean up code
- create development script
- prepare for production
- add new api api/ai/info
