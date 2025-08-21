from fastapi import APIRouter, HTTPException
from core.db import data
from models import ProductDtoRequest

router = APIRouter()

@router.post("")
def add_product(body : ProductDtoRequest):
    session_id = body.session_id
    if not session_id in data:
        raise HTTPException(status_code=404, detail="Invalid session id")
    session = data[session_id]
    session["selections"].insert(0, {"id" : body.id, "name" : body.name})
    session["selections"] = session["selections"][:5]
    return {"products" : session["selections"]}


@router.get("")
def get_product(session_id : str):
    if session_id not in data:
        raise HTTPException(status_code=404, detail="Invalid session id")
    product = None
    if data[session_id]["selections"]:
       product = data[session_id]["selections"][0]
    return {"product" : product}