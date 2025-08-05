import os
import certifi
from dotenv import load_dotenv
from fastapi import FastAPI, Body, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional

# --- 1. Application Setup & Configuration ---

# Load environment variables from .env file
# Make sure your .env file is in the same directory you run uvicorn from.
load_dotenv()

# Create the FastAPI app instance
app = FastAPI()

# --- 2. Security & Middleware ---

# CORS Middleware to allow frontend communication
origins = [
    "http://localhost:3000", # For Create React App
    "http://localhost:5173", # Default for Vite
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 3. Database Connection ---

MONGO_CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")
print(f"DEBUG: Connecting to MongoDB with URL: {MONGO_CONNECTION_STRING}")

# Use certifi to provide SSL certificates
ca = certifi.where()

try:
    # Connect to MongoDB Atlas
    client = AsyncIOMotorClient(MONGO_CONNECTION_STRING, tlsCAFile=ca, tlsAllowInvalidCertificates=True)
    # Get a reference to the database
    db = client.get_database("ai_project_manager_db")
    # Get a reference to the 'users' collection
    user_collection = db.get_collection("users")
    print("✅ Successfully connected to MongoDB Atlas.")
except Exception as e:
    print(f"❌ Failed to connect to MongoDB: {e}")
    user_collection = None

# --- 4. Data Models (Pydantic) ---

# Model for creating a new user
class UserCreateModel(BaseModel):
    username: str = Field(..., example="john_doe")
    password: str = Field(..., example="a-very-strong-password")

# Model for handling login requests
class UserLoginModel(BaseModel):
    username: str
    password: str

# Model for returning user details to the client (omitting the password)
class UserOutModel(BaseModel):
    id: str = Field(alias="_id")
    username: str

    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True,
    )

# --- 5. API Endpoints ---

@app.get("/")
async def root():
    return {"message": "Welcome to the User Authentication API!"}

@app.post(
    "/api/users",
    response_description="Create a new user",
    response_model=UserOutModel,
    status_code=status.HTTP_201_CREATED,
)
async def create_user(user: UserCreateModel = Body(...)):
    """
    Create a new user with a username and password.
    The password will be stored as plain text.
    """
    if user_collection is None:
        raise HTTPException(status_code=503, detail="Database service not available.")

    # Check if user already exists
    existing_user = await user_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )

    # Create user document directly from the input model
    user_document = user.model_dump()

    # Insert the new user into the database
    new_user = await user_collection.insert_one(user_document)
    created_user = await user_collection.find_one({"_id": new_user.inserted_id})

    if created_user:
        created_user["_id"] = str(created_user["_id"])
        return UserOutModel(**created_user)

    raise HTTPException(status_code=500, detail="User could not be created.")

@app.post("/api/login")
async def login(user_credentials: UserLoginModel = Body(...)):
    """
    Authenticate a user and return a simple success message.
    """
    if user_collection is None:
        raise HTTPException(status_code=503, detail="Database service not available.")

    user = await user_collection.find_one({"username": user_credentials.username})
    if not user or user["password"] != user_credentials.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    
    return {"status": "success", "message": "Login successful"}


@app.get(
    "/api/users/{username}",
    response_description="Get a user by username",
    response_model=UserOutModel,
)
async def get_user(username: str):
    """
    Retrieve a user's details by their username.
    """
    if user_collection is None:
        raise HTTPException(status_code=503, detail="Database service not available.")
        
    user = await user_collection.find_one({"username": username})
    if user:
        user["_id"] = str(user["_id"])
        return UserOutModel(**user)
    
    raise HTTPException(status_code=404, detail=f"User '{username}' not found")
