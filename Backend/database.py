import os
from dotenv import load_dotenv, dotenv_values 
from pymongo import MongoClient

load_dotenv() 

dbuser = os.getenv("dbusr")
dbpswd = os.getenv("dbpswd")

client1 = MongoClient(f"mongodb+srv://{dbuser}:{dbpswd}@maincollection.ddaq5vt.mongodb.net/?retryWrites=true&w=majority&appName=MainCollection")

print(client1)