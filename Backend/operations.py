# crud.py
from models import ItemModel
from database import collection
from bson.objectid import ObjectId

async def retrieve_item(id: str) -> dict:
    item = await collection.find_one({"_id": ObjectId(id)})
    if item:
        return item

async def retrieve_items() -> list:
    items = []
    async for item in collection.find():
        items.append(item)
    return items

async def add_item(item_data: dict) -> dict:
    item = await collection.insert_one(item_data)
    new_item = await collection.find_one({"_id": item.inserted_id})
    return new_item

async def update_item(id: str, data: dict):
    if len(data) < 1:
        return False
    item = await collection.find_one({"_id": ObjectId(id)})
    if item:
        updated_item = await collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_item:
            return True
    return False

async def delete_item(id: str):
    item = await collection.find_one({"_id": ObjectId(id)})
    if item:
        await collection.delete_one({"_id": ObjectId(id)})
        return True
