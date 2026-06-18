import React, { useState } from "react";
// import stockData from "./data/stockData";

// export const SalesList = (stockList, cart) => {
export const SalesList = ({ cart, handleSales, itemList, removeCartItem }) => {
    // const stockData = useContext(StockDataContext);
    // const [ cart, setCart ] = useState([]);
    // const [ stocks, setStocks ] = useState(stockList);
    // const [ detailCart, setDetailCart ] = useState(cart);

    // const addItem = (newItem) => {
    //     setCart((prev) => 
    //         [...prev,
    //         { ...newItem, id: uuid() }
    //     ]);
    // };


    // const updateStocks = stocks.map((stockItem) => {
    //     const cartItem = cart.find(
    //         (c) => c.id === stockItem.id
    //     );

    //     if(cartItem) {
    //         return {
    //             ...stockItem,
    //             quantity:
    //                 stockItem.quantity - cartItem.quantity,
    //         };
    //     }

    //     return stockItem;
    // });
    // updateStocks(detailCart);


    return(
        <>
            {/* <SalesForm addItem={addItem} stocks={stocks} />
            <br /> */}

            <p>===== Sales List ======</p>
            <ul>
                {/* {detailCart.map((i) => ( */}
                {cart.map((i) => {
                    const item = itemList.find(
                        (item) => {
                            item.item_number === i.item_number
                        }
                    );
                    return(
                    <li key={i.cart_id}>
                        {console.log(i)}
                        {i.item_name} x {i.quantity} -- 単価:{item?.price}
                        <button 
                            onClick={() => 
                                removeCartItem(i.cart_id)
                            }
                        >
                        削除
                        </button>
                    </li>
                    );
                })};
            </ul>
            <button onClick={handleSales} >販売する</button>
        </>
    
    );

}

