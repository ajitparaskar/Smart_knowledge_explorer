from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from db import db
import bcrypt

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    existing_user = db.users.find_one({"username": username})
    if existing_user:
        return {"message": "Username already exists"}, 400

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    db.users.insert_one({
        "username": username,
        "password": hashed_password
    })

    return {"message": "User registered successfully"}


@auth_bp.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    user = db.users.find_one({"username": username})

    if not user:
        return {"message": "User not found"}, 404

    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return {"message": "Invalid password"}, 401

    access_token = create_access_token(identity=username)

    return {
        "message": "Login successful",
        "access_token": access_token
    }