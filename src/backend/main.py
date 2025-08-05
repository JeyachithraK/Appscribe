import os
import certifi
from dotenv import load_dotenv
from fastapi import FastAPI, Body, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from bson import ObjectId # Import ObjectId to validate the ID format

# --- 1. Application Setup & Configuration ---

load_dotenv()
app = FastAPI()

# --- 2. Security & Middleware ---

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
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

ca = certifi.where()

try:
    client = AsyncIOMotorClient(MONGO_CONNECTION_STRING, tlsCAFile=ca, tlsAllowInvalidCertificates=True)
    db = client.get_database("ai_project_manager_db")
    user_collection = db.get_collection("users")
    project_collection = db.get_collection("projects")
    print("✅ Successfully connected to MongoDB Atlas.")
except Exception as e:
    print(f"❌ Failed to connect to MongoDB: {e}")
    user_collection = None
    project_collection = None

# --- 4. Data Models (Pydantic) ---

# --- User Models ---
class UserCreateModel(BaseModel):
    username: str = Field(..., example="john_doe")
    password: str = Field(..., example="a-very-strong-password")

class UserLoginModel(BaseModel):
    username: str
    password: str

class UserOutModel(BaseModel):
    id: str = Field(alias="_id")
    username: str
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)

# --- Project Models ---
class ProjectCreateModel(BaseModel):
    projectName: str = Field(..., example="New E-commerce Site")
    clientName: str = Field(..., example="Global Retail Inc.")
    owner_username: str = Field(..., example="testuser1")

class ProjectOutModel(BaseModel):
    id: str = Field(alias="_id")
    projectName: str
    clientName: str
    owner_username: str
    status: str
    report: str
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)


# --- 5. API Endpoints ---

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Project Manager API!"}

# --- User Endpoints ---
@app.post("/api/users", response_model=UserOutModel, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreateModel = Body(...)):
    if user_collection is None: raise HTTPException(status_code=503, detail="Database service not available.")
    if await user_collection.find_one({"username": user.username}): raise HTTPException(status_code=400, detail="Username already registered")
    new_user = await user_collection.insert_one(user.model_dump())
    created_user = await user_collection.find_one({"_id": new_user.inserted_id})
    created_user["_id"] = str(created_user["_id"])
    return UserOutModel(**created_user)

@app.post("/api/login")
async def login(user_credentials: UserLoginModel = Body(...)):
    if user_collection is None: raise HTTPException(status_code=503, detail="Database service not available.")
    user = await user_collection.find_one({"username": user_credentials.username})
    if not user or user["password"] != user_credentials.password: raise HTTPException(status_code=401, detail="Incorrect username or password")
    return {"status": "success", "message": "Login successful", "username": user["username"]}

# --- Project Endpoints ---
@app.post("/api/projects", response_model=ProjectOutModel, status_code=status.HTTP_201_CREATED)
async def create_project(project: ProjectCreateModel = Body(...)):
    if project_collection is None: raise HTTPException(status_code=503, detail="Database service not available.")
    project_document = project.model_dump()
    project_document['status'] = 'Draft'
    project_document['report'] = 'Client requirements report has not been generated yet.'
    new_project = await project_collection.insert_one(project_document)
    created_project = await project_collection.find_one({"_id": new_project.inserted_id})
    created_project["_id"] = str(created_project["_id"])
    return ProjectOutModel(**created_project)

@app.get("/api/projects/{username}", response_model=List[ProjectOutModel])
async def get_projects_by_username(username: str):
    if project_collection is None: raise HTTPException(status_code=503, detail="Database service not available.")
    projects = []
    async for project in project_collection.find({"owner_username": username}):
        project["_id"] = str(project["_id"])
        projects.append(ProjectOutModel(**project))
    return projects

# --- NEW ENDPOINT ---
@app.get("/api/project/{project_id}", response_model=ProjectOutModel)
async def get_project_by_id(project_id: str):
    """
    Retrieve a single project by its unique ID.
    """
    if project_collection is None:
        raise HTTPException(status_code=503, detail="Database service not available.")
    
    # --- DEBUGGING LINE ---
    print(f"--- Attempting to find project with ID: {project_id} ---")
    
    try:
        # Convert the string ID from the URL to a MongoDB ObjectId
        obj_id = ObjectId(project_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid project ID format.")

    project = await project_collection.find_one({"_id": obj_id})
    
    if project:
        project["_id"] = str(project["_id"])
        return ProjectOutModel(**project)
    
    raise HTTPException(status_code=404, detail=f"Project with ID '{project_id}' not found")
