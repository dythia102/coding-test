from fastapi.testclient import TestClient
import sys
import os

sys.path.insert(0, os.path.abspath("."))  # ensures /app is in sys.path
from main import app

client = TestClient(app)


def test_pagination():
    res = client.get("/api/sales-reps?page=1&page_size=5")
    assert res.status_code == 200
    data = res.json()
    assert "salesReps" in data
    assert "meta" in data
    assert data["meta"]["page"] == 1
    assert data["meta"]["page_size"] == 5
    assert len(data["salesReps"]) <= 5


def test_filter_by_region():
    res = client.get("/api/sales-reps?regions=West")
    assert res.status_code == 200
    for rep in res.json()["salesReps"]:
        assert rep["region"].lower() == "west"


def test_filter_by_roles():
    res = client.get("/api/sales-reps?roles=Manager")
    assert res.status_code == 200
    for rep in res.json()["salesReps"]:
        assert rep["role"].lower() == "manager"


def test_combined_region_and_industry():
    res = client.get("/api/sales-reps?regions=West&client_industries=Retail")
    assert res.status_code == 200
    for rep in res.json()["salesReps"]:
        assert rep["region"].lower() == "west"
        assert any("retail" in c["industry"].lower() for c in rep["clients"])


def test_search_term_in_name_or_skills():
    res = client.get("/api/sales-reps?search_term=tech")
    assert res.status_code == 200
    for rep in res.json()["salesReps"]:
        match_name = "tech" in rep["name"].lower()
        match_skill = any("tech" in skill.lower() for skill in rep["skills"])
        assert match_name or match_skill


def test_sorting_by_name_asc():
    res = client.get("/api/sales-reps?sort_by=name&sort_order=asc")
    assert res.status_code == 200
    names = [rep["name"] for rep in res.json()["salesReps"]]
    assert names == sorted(names)


def test_filter_options_endpoint():
    res = client.get("/api/sales-reps/filters")
    assert res.status_code == 200
    data = res.json()
    assert "regions" in data
    assert "roles" in data
    assert "industries" in data
    assert "client_names" not in data  # should NOT be returned
