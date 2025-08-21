import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { selectProduct } from "../api/cartApi";
import { PAGE_PAYMENTS } from "../constants";
import { updateScreen } from "../api/sessionApi";

export const products = [
    {"id" : "1", "name" : "Diamond Pendant", "price" : "₹ 98,999", "img" : "/images/jewelry1.jpeg"},
    {"id" : "2", "name" : "Gold Bangles", "price" : "₹ 78,999", "img" : "/images/jewelry2.jpeg"},
    {"id" : "3", "name" : "Gold Necklace", "price" : "₹ 1,13,999", "img" : "/images/jewelry3.jpeg"},
    {"id" : "4", "name" : "Gold Bracelet", "price" : "₹ 79,999", "img" : "/images/jewelry4.jpeg"},
    {"id" : "5", "name" : "Gold Watch", "price" : "₹ 69,999", "img" : "/images/jewelry5.jpeg"},
    {"id" : "6", "name" : "Diamond Ring", "price" : "₹ 1,29,999", "img" : "/images/jewelry6.jpeg"},

]

const Catalog = () => {
    const navigate = useNavigate();

    const onProductSelect = (product) =>  {
        selectProduct(product)
        .then(() => updateScreen(PAGE_PAYMENTS))
        .then(() => navigate("/" + PAGE_PAYMENTS))
        // .catch(err => alert(err))
    }

    return (
        <>
            <div className="container mx-auto grid grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-20">
                {products.map((product) => (
                    <div key={product.id} className="bg-gray-200 rounded-lg" onClick={() => onProductSelect(product)}>
                        <div className="p-2">
                            <img src={product.img} className="rounded-lg"></img>
                        </div>
                        <div className="p-2 grid grid-cols-2 pb-5">
                            <div>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                            </div>
                            <div>
                                <button className="cursor-pointer bg-blue-500 hover:bg-blue-700 mt-2 px-4 py-2 text-white rounded-md
                                transition-transform hover:scale-105 w-full">SELECT</button>
                            </div>
                        </div>
                    </div>
                )
                )}
            </div>
        </>
    )
}

export default Catalog;