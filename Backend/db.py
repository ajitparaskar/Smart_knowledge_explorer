from pymongo import MongoClient
import os

# Read Mongo URI from environment
MONGO_URI = os.getenv("MONGO_URI")

# Create Mongo Client
client = MongoClient(MONGO_URI)

# Access Database
db = client["smart_knowledge_explorer"]