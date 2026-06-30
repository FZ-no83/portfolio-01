import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { PurchaseForm } from './PurchaseForm';
// import { PurchaseCart } from './PurchaseCart';
import { PurchaseList } from './PurchaseList';
// import { Page3StockData } from './Page2StockData';
//import { Page1ListForm } from './Page1ListForm';
import toast from "react-hot-toast";
import "./PurchasePage.css";


export const PurchasePage = ({stockList, itemList, cart}) => {
    const [ cartItems, setCartItems ] = useState([]);
    console.log("stockList", stockList);
    console.log("itemList", itemList);

    const addCartItem = (newItem) => {

        setCartItems((prev) => {

            const existingItem = prev.find((item) =>
                item.item_number === newItem.item_number
            );

            if(existingItem) {
                return prev.map((p) => {
                    if (p.item_number === newItem.item_number){
                        return {...p,
                            quantity: p.quantity + newItem.quantity
                        };
                    }
                    return p;
                });
            } else {
                return [ ...prev,
                    { 
                        ...newItem, cart_id: uuid(),
                    },
                ];
            }
        });
    }

    const handlePurchase = async () => {
        console.log("仕入れ実行");
        try {

            const res = await fetch(
                "http://localhost:3001/purchaseList",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cartItems),
                }
            );

            if (!res.ok) {
                throw new Error("仕入・登録失敗");
            }

            toast.success("仕入を発注しました");

            setCartItems([]);
        } catch(error) {
            toast.error("仕入の発注に失敗しました");
            console.error(error);
        }
    };

    const removeCartItem = (cartId) => {
        setCartItems((prev) => 
            prev.filter(
                (item) => item.cart_id !== cartId
            )
        );
    };

    return (
        <div className="page-container">
            <h1>仕入管理</h1>
            <PurchaseForm 
                itemList={itemList}
                addCartItem={addCartItem}
            />
            <br />
            <PurchaseList 
                // stockList={stockList}
                cart={cartItems} 
                itemList={itemList}
                handlePurchase={handlePurchase}
                removeCartItem={removeCartItem}
                stockList={stockList}
            />
            <br />
            {/* <Page3StockData /> */} 
        </div>
    );
}

//export default Page1