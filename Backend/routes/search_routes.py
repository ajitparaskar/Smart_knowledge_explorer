from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import db
from datetime import datetime
import requests

search_bp = Blueprint("search", __name__)


# -------------------------
# Search Route
# -------------------------
@search_bp.route("/api/search", methods=["GET"])
@jwt_required()
def search():
    current_user = get_jwt_identity()

    query = request.args.get("query")

    if not query:
        return {"message": "Query parameter required"}, 400

    formatted_query = query.replace(" ", "_")

    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{formatted_query}"

    headers = {
        "User-Agent": "SmartKnowledgeExplorer/1.0 (ajit@example.com)"
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return {"message": "No results found"}, 404

    data = response.json()

    # Store search history
    db.search_history.insert_one({
        "username": current_user,
        "query": query,
        "title": data.get("title"),
        "searched_at": datetime.utcnow()
    })

    return {
        "searched_by": current_user,
        "title": data.get("title"),
        "summary": data.get("extract")
    }


# -------------------------
# History Route
# -------------------------
@search_bp.route("/api/history", methods=["GET"])
@jwt_required()
def get_history():
    current_user = get_jwt_identity()

    history = db.search_history.find(
        {"username": current_user}
    ).sort("searched_at", -1)

    results = []

    for item in history:
        results.append({
            "query": item.get("query"),
            "title": item.get("title"),
            "searched_at": item.get("searched_at")
        })

    return {
        "user": current_user,
        "history": results
    }