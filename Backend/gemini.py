import google.generativeai as genai
import os
from dotenv import load_dotenv, dotenv_values
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = ["http://127.0.0.1:5500","http://localhost:5500"]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,  # Allows requests from these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)
load_dotenv()
myApi = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=myApi)
model = genai.GenerativeModel('gemini-1.5-flash')
# data = "I'm going not home"   -- Testing prompt
# res = model.generate_content("tell only 1 motivational quote")
# print("content response type: ",type(res))
# print(res)

#functionalities through prompts
#get a random story in any category in 150 words
def getStory(categ: str):
    res = model.generate_content(f"get me short random {categ} story in 150 words ")
    return res.text

#effective writing
def effective(data: str):
    res = model.generate_content(f"{data} --express this from any person point of view in a short sentence of your choice with any relevant scene in a story if I have not mentioned or if I have mentioned then only from my context")
    return res.text

#grammar checking
def gramchk(data: str):
    res = model.generate_content(f'{data} --grammar check this and just give one perfect response sentence')
    return res.text