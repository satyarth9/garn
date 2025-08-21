import { SERVER_URL_BASE, SESSION_API_SPACE_SLUG, UPDATE_SCREEN_SLUG, SESSION_ID, GET_CONTEXT_SLUG } from "../constants";

export async function createSession(currPage) {
    try {
        const resp = await fetch(
            SERVER_URL_BASE + SESSION_API_SPACE_SLUG,
            {
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"screen" : currPage})
            }
        );
        const data = await resp.json();
        if (resp.ok) {
            localStorage.setItem(SESSION_ID, data.session_id);
        }
        return data;
    } catch (error){
        console.error(error);
        throw error;
    }
}

export async function updateScreen(nextScreen) {
    try {
        const resp = await fetch(
            SERVER_URL_BASE + SESSION_API_SPACE_SLUG + UPDATE_SCREEN_SLUG,
            {
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({"session_id" : localStorage.getItem(SESSION_ID), "screen" : nextScreen})
            }
        );

        if (!resp.ok) {
            throw new Error(`HTTP error, status: ${resp.status}`);
        }

        return await resp.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getContext() {
    try {
        const resp = await fetch(
            SERVER_URL_BASE + SESSION_API_SPACE_SLUG + GET_CONTEXT_SLUG + "?" + "session_id=" + 
            localStorage.getItem(SESSION_ID)
        );

        if (!resp.ok) {
            throw new Error(`HTTP error, status: ${resp.status}`);
        }
        return await resp.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
