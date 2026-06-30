import React from "react";
// import React, { useState, useContext } from "react";
// import { v4 as uuid } from "uuid";
// import { stockDataContext } from "./data/stockData";
import "./PurchasePage.css";

export const PurchaseList = ({cart, itemList, handlePurchase, removeCartItem, stockList}) => {
    // const [stockData, setStockData] = useState();
    // const stockArray = useContext(stockDataContext);
    // console.log("stockList:", stockList);
    const cartTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );


    return (
        <>
            <div className="purchase-cart-card">
                <h3>カート：仕入</h3>
                <ul className="cart-list">
                    {cart.length === 0 ? (
                        <p className="empty-cart">
                            🛒 商品が追加されていません
                        </p>
                    ) : (
                        cart.map((p) => {
                            const item = itemList.find(
                                (item) => 
                                    item.item_number === p.item_number
                            );
                            return(
                                <li 
                                    className="purchase-cart-item"
                                    key={p.cart_id}
                                >
                                    {console.log(p)}
                                    {p.item_name} x {p.quantity} 単価: {item?.price}
                                    <button
                                        className="purchase-cart-delete"
                                        onClick={() => 
                                            removeCartItem(p.cart_id)
                                        }
                                    >
                                    削除
                                    </button>
                                </li>
                            );
                        })
                    )}
                </ul>
                <br />
                {cart.length !== 0 && (
                    <>
                        <div className="purchase-total">
                            合計金額　¥
                            <span>
                                {cartTotal.toLocaleString()}
                            </span>
                        </div>
                        <button 
                            className="purchase-btn"
                            onClick={handlePurchase} 
                        >
                            🛒 仕入を確定
                        </button>
                    </>
                )}

            </div>
            <br />

            <div className="stock-table-container">
                <h3>在庫一覧表</h3>
                <div className="stock-table">
                    <table>
                        <thead>
                            <th>商品名</th>
                            <th>数量</th>
                            <th>入荷日</th>
                        </thead>
                        <tbody>
                            {stockList.map((s) => (
                                <tr key={s.id}>
                                    {console.log(s)}
                                    <td>{s.item_name}</td>
                                    <td>{s.quantity}</td>
                                    <td>{s.day}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );


};

        // <ul>
        // {stockList.map((s) => (
        //          {stockArray.map((s) => (
        //             <li key={s.id}>
        //                 {console.log(s)}
        //                 {s.item_name} x {s.quantity} : ¥
        //             </li>
        //         ))}
        //     </ul>