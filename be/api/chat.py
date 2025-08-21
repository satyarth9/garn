from fastapi import APIRouter
from models import ChatPayload
from core.db import data
from huggingface_hub import InferenceClient

router = APIRouter()
hf_client = InferenceClient()
MAX_MESSAGE_COUNT = 8

@router.post("")
def chat(body : ChatPayload):
    session_id = body.session_id
    if session_id not in data:
        raise HTTPException(status_code=404, detail="Invalid session id")
    message = body.message
    site_context = """Website has three pages: Landing, Catalog, Payment. Landing: static center image,
                    Login button top-right → goes to Catalog. Catalog: click a product image → goes to Payment 
                    (only one product can be selected). Payment: 'Pay Now' completes dummy payment."""
    
    session = data[session_id]
    session["history"].insert(0, {"role" : "user", "content" : message})
    session["history"] = session["history"][:MAX_MESSAGE_COUNT]

    prompt = f"""You are a helpful shopping assistant on an E-Commerce website.
            SiteMap : {site_context}
            Current screen: {session['screen']}
            Most recent user selections (in order): {session['selections']}
            Recent conversation: {session['history']}
            User: {message}
            Since this is a chat message, keep your tone conversational only. Limit your answers to 30 words or less.
            Do not include any technical info in your reply content (e.g. kept it under 30 words, kept it short etc.)"""

    
    response = hf_client.chat.completions.create(
        model="deepseek-ai/DeepSeek-V3-0324",
        messages=[
            {
                "role" : "user",
                "content" : prompt
            },
        ]

    )

    reply = response.choices[0].message
    session["history"].insert(0, {"role": "bot", "content": reply})
    return {"reply": reply}




