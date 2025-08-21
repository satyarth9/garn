import { CART_API_SPACE_SLUG, SERVER_URL_BASE, SESSION_ID } from "../constants";

export async function selectProduct(product) {
    try {
        const resp = await fetch(
            SERVER_URL_BASE + CART_API_SPACE_SLUG,
            {
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({"session_id" : localStorage.getItem(SESSION_ID), "id" : product.id, "name" : product.name})
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

export async function getProduct() {
    try {
        const resp = await fetch(SERVER_URL_BASE + CART_API_SPACE_SLUG
             + "?" + "session_id=" + localStorage.getItem(SESSION_ID));

        if (!resp.ok) {
            throw new Error(`HTTP error, status: ${resp.status}`);
        }
        return await resp.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}