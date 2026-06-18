import React from "react";
// import React, { useState, useContext } from "react";
// import { v4 as uuid } from "uuid";
// import { stockDataContext } from "./data/stockData";

export const PurchaseList = ({cart, itemList, handlePurchase, removeCartItem, stockList}) => {
    // const [stockData, setStockData] = useState();
    // const stockArray = useContext(stockDataContext);

    // console.log("stockList:", stockList);

    return (
        <>
            <p>-- Purchase List --</p>
            <ul>
                {cart.map((p) => {
                    const item = itemList.find(
                        (item) => 
                            item.item_number === p.item_number
                    );
                    return(
                        <li key={p.cart_id}>
                            {console.log(p)}
                            {p.item_name} x {p.quantity} -- 単価: {item?.price}
                            <button
                                onClick={() => 
                                    removeCartItem(p.cart_id)
                                }
                            >
                            削除
                            </button>
                        </li>
                    );
                })};
            </ul>
            <br />
            <button onClick={handlePurchase} >仕入れる</button>
            <br />
            <p>===== Stock List(API) ======</p>
            {/* {const total = aaa;} */}
            <ul>
                {stockList.map((s) => (
                // {stockArray.map((s) => (
                    <li key={s.id}>
                        {console.log(s)}
                        {s.item_name} x {s.quantity} : ¥
                    </li>
                ))}
            </ul>
        </>
    );


};
