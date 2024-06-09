from fastapi import FastAPI, Request, HTTPException
# import fastapi.responses as far
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
import gemini as gem
# from fastapi.staticfiles import StaticFiles
# from fastapi.templating import Jinja2Templates
# App Start
app = FastAPI()
#############
# CORS Policy Handling:
origins = ["http://127.0.0.1:5500","http://localhost:5500"]
app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,  # Allows requests from these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)
#############

# importing os module for environment variables
# import os
# importing necessary functions from dotenv library
# from dotenv import load_dotenv, dotenv_values 
# loading variables from .env file
# load_dotenv() 

# accessing API_key safely
# myApi = os.getenv("api_key")
# templates = Jinja2Templates(directory="templates")

# @app.get("/home", response_class=far.HTMLResponse)
# async def read_item(req: Request):
#     return templates.TemplateResponse("index.html", {"request":req})
######################################################################
#story fetching

# @app.get("/story/{categ}")
# async def get_story(num):
#     story_type : str = categ
#     story = gem.getStory("suspense")
#     return {"message": f"{story_type} Story that you requested is :\n\n{story}"}

@app.get("/story/{cat}")
async def get_item(cat):
    story = gem.getStory(cat)
    return {"message": story}

@app.get("/effective")
async def get_effective(data):
    scene = gem.effective("cute")
    return {"message": story}
######################################################################
# AI Integration
# @app.get("/ai/generate-content")
# async def read_root():
#     story = gem.getStory("suspense")
#     return {f"Story that you requested :\n{story}"}
# @app.get("/test")
# async def read_root():
#     return {"Story generated"}
####################################################################
# Database
# from models import ItemModel
# from crud import (
#     retrieve_item,
#     retrieve_items,
#     add_item,
#     update_item,
#     delete_item,
# )

# app = FastAPI()

# @app.post("/items/", response_description="Add new item", response_model=ItemModel)
# async def create_item(item: ItemModel):
#     new_item = await add_item(item.dict())
#     return new_item

# @app.get("/items/", response_description="List all items", response_model=list[ItemModel])
# async def get_items():
#     items = await retrieve_items()
#     return items

# @app.get("/items/{id}", response_description="Get a single item", response_model=ItemModel)
# async def get_item(id: str):
#     item = await retrieve_item(id)
#     if item:
#         return item
#     raise HTTPException(status_code=404, detail="Item not found")

# @app.put("/items/{id}", response_description="Update an item", response_model=ItemModel)
# async def update_item_data(id: str, item: ItemModel):
#     update_success = await update_item(id, item.dict())
#     if update_success:
#         return await retrieve_item(id)
#     raise HTTPException(status_code=404, detail="Item not found")

# @app.delete("/items/{id}", response_description="Delete an item")
# async def delete_item_data(id: str):
#     delete_success = await delete_item(id)
#     if delete_success:
#         return {"message": "Item deleted successfully"}
#     raise HTTPException(status_code=404, detail="Item not found")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=7700)
