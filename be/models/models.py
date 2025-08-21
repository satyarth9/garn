from pydantic import BaseModel

class SessionCreateRequest(BaseModel):
    screen : str

class ScreenUpdateRequest(BaseModel):
    session_id : str
    screen : str

class ProductDtoRequest(BaseModel):
    session_id : str
    id : str
    name : str

class ChatPayload(BaseModel):
    session_id : str
    message : str