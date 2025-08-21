from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from api import session, cart, chat


app = FastAPI(title="Garn Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(session.router, prefix="/session", tags=["session"])
app.include_router(cart.router, prefix="/cart", tags=["cart"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])

