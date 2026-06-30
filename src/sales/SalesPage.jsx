import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { SalesList } from './SalesList';
import { SalesForm } from './SalesForm';
import toast from "react-hot-toast";
import "./SalesPage.css";


export const SalesPage = ({ stockList, cart, itemList }) => {
    const [ cartItems, setCartItems ] = useState([]);

    console.log(cartItems);

    const addCartItem = (newItem) => {
        console.log("addCartItem");
        console.log(newItem);

        setCartItems((prev) => {

            const existingItem = prev.find(
                (item) =>
                    item.item_number === newItem.item_number
            );

            if(existingItem) {
                return prev.map((p) => {
                    if (p.item_number === newItem.item_number){
                        return {...p,
                            quantity: p.quantity + newItem.quantity,
                            // price: p.price + newItem.price,
                        };
                    }
                    return p;
                });
            } else {
                return [ 
                    ...prev,
                    {
                        ...newItem,
                        cart_id: uuid(),
                    },
                ];
            }
        });
    };

    const handleSales = async () => {
        console.log("販売実行");
        
        try{
            const res = await fetch(
                "http://localhost:3001/salesList",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(cartItems),
                }  
            );

            if (!res.ok) {
                throw new Error("売上登録・更新失敗");
            }

            toast.success("売上を登録しました");

            setCartItems([]);
        } catch(error) {
            toast.error("売上登録に失敗しました");
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

    // 在庫を減らす
    // const updateStocks = stockList.map((stockItem) => {
    //     const cartItem = cartItems.find(
    //         (c) => c.id === stockItem.id
    //     );

    //     if(cartItem) {
    //         return {
    //             ...stockItem,
    //             quantity:
    //                 stockItem.quantity - cartItem.quantity,
    //         };
    //     };

    //     return stockItem;
    // });


    return (
        <div className="page-container">
            <h1>販売ページ</h1>
            {/* <p>-- 商品選択 --</p> */}
                <SalesForm 
                    addCartItem={addCartItem}
                    stocks={stockList}
                />
            <br />
            {/* <p>-- 商品一覧 --</p> */}
                <SalesList
                    cart={cartItems}
                    handleSales={handleSales}
                    itemList={itemList}
                    removeCartItem={removeCartItem}
                />
            <br />
        </div>
    );
};

