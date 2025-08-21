import { useEffect, useState } from "react";
import { getProduct } from "../api/cartApi";
import { products } from "./Catalog";

const Payment = () => {

    const [productId, setProductId] = useState("0");

    useEffect(() => {
        getProduct()
        .then(data => {
            console.log("pid====" + data.product.id)
            setProductId(data.product.id)
        })
    }, [])

    const product = products.find(prod => prod.id === productId);


    if (!product) {
        return <div>Please select a product first!</div>
    }

    return (
        <>
            <div className="flex justify-center mt-20">
                <div key={product.id} className="bg-gray-200 rounded-lg">
                        <div className="p-2">
                            <img src={product.img} className="rounded-lg"></img>
                        </div>
                        <div className="p-2 pb-5">
                            <div>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                            </div>
                            <div>
                                <button className="cursor-pointer bg-blue-500 hover:bg-blue-700 mt-2 px-4 py-2 text-white rounded-md
                                transition-transform hover:scale-101 w-full" onClick={() => alert("Payment Sucessful!")}>PAY NOW</button>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Payment;