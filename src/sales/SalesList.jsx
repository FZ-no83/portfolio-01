import React, { useState } from "react";
// import stockData from "./data/stockData";

// export const SalesList = (stockList, cart) => {
export const SalesList = ({ cart, handleSales, itemList, removeCartItem }) => {
    // console.log(itemList);
    const cartTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // const cartTotal = useMemo(() => {
    // return cart.reduce(
    //     (sum, item) => sum + item.price * item.quantity,
    //     0
    // );
    // }, [cart]);

    return(
        <div className="sales-cart-card">
            {/* <SalesForm addItem={addItem} stocks={stocks} />
            <br /> */}

            <h3>カート：販売</h3>
            {/* <ul className="cart-list"> */}
                {cart.length === 0 ? (
                    <p className="empty-cart">
                        🛒 カートは空です
                    </p>
                ):( 
                    <div className="sales-cart-wrapper">
                        <table className="sales-cart-table">
                            <thead>
                                <tr>
                                    <th>商品名</th>
                                    <th>数量</th>
                                    <th>小計</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((i) => {
                                    const item = itemList.find(
                                        (item) => item.item_number === i.item_number
                                    );
                                    console.log("map.i");
                                    console.log(i);
                                    console.log("item");
                                    console.log(item);
                                    return(
                                    // className="sales-cart-item"
                                        <tr key={i.cart_id}>
                                            {console.log(i)}
                                            <td>{i.item_name}</td>
                                            <td>{i.quantity}</td>
                                            <td>¥{(i.price*i.quantity).toLocaleString()}</td>
                                            <td>
                                                <button 
                                                    className="sales-cart-delete"
                                                    onClick={() => 
                                                        removeCartItem(i.cart_id)}
                                                >
                                                    削除
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    )
                }

                {cart.length !== 0 && (
                    <>
                        <div className="sales-total">
                            合計金額　¥
                            <span>
                                {cartTotal.toLocaleString()}
                            </span>
                        </div>
                        <button 
                            className="sales-btn"
                            onClick={handleSales} 
                        >
                            販売する
                        </button>
                    </>
                )}

        </div>
    
    );

}

