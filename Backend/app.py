from flask import Flask
from flask_cors import CORS
from config import Config
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

# Import Blueprints
from routes.auth_routes import auth_bp
from routes.search_routes import search_bp


# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize JWT
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(search_bp)


# Basic Route
@app.route("/")
def home():
    return {
        "message": "Smart Knowledge Explorer Backend Running 🚀",
        "status": "success"
    }


if __name__ == "__main__":
    app.run(debug=True)