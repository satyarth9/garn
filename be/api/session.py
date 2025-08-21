from fastapi import APIRouter, HTTPException
from core.db import data
import uuid
from models import SessionCreateRequest, ScreenUpdateRequest
from datetime import datetime

router = APIRouter()

@router.post("")
def start_session(body : SessionCreateRequest):
    session_id = str(uuid.uuid4())
    session_obj = {
        "screen" : body.screen,
        "start_time" : str(datetime.now()),
        "selections" : [],
        "history" : []
    }
    data[session_id] = session_obj

    return {"session_id" : session_id}


@router.post("/screen")
def update_screen(body : ScreenUpdateRequest):
    session_id = body.session_id
    if not session_id in data:
        raise HTTPException(status_code=404, detail="Invalid session id")
    data[session_id]["screen"] = body.screen
    return {"session_id" : session_id, "screen" : data[session_id]["screen"]}

@router.get("/context")
def get_context(session_id : str):
    if session_id not in data:
        raise HTTPException(status_code=404, detail="Invalid session id")
    session = data[session_id]
    return session    