import React, { useState, useContext } from "react";
// import StockDataContext from "./data/stockData";
//import { v4 as uuid } from "uuid";
//import ItemListDataContext from "./data/itemListData";


export const SalesForm = ({ addCartItem, stocks }) => {
//    const items = useContext(ItemListDataContext);
    // const stocks = useContext(StockDataContext);
    const [formData, setFormData] = useState({
        id: "",
        item_number: "",
        item_name: "",
        quantity: 1, 
    });

    const [selectedStock, setSelectedStock] = useState(0);

    console.log(formData);
    
    const handleChange = (evt) => {

        if(formData.quantity > selectedStock){
            alert("在庫不足です");
            // return;
        }

        const value = 
            evt.target.name === "quantity"
                ? evt.target.value === ""
                    ? ""
                    : Number(evt.target.value)
                : evt.target.value;

        setFormData({
            ...formData, 
            [evt.target.name]: value,
        });

        // setFormData({
        //     ...formData, 
        //     [evt.target.name]: 
        //         evt.target.name === "quantity"
        //         ? Number(evt.target.value)
        //         : evt.target.value,
        // });
    };

    const handleSelect = (e) => {
        const selected = stocks.find(
            (s) => s.item_name === e.target.value
        );

        if (!selected) return;
        
        setFormData({
            ...formData,
            id: selected.id,
            item_number: selected.item_number,
            item_name: selected.item_name,
            price: selected.price,
        });

        setSelectedStock(selected.quantity);
    };

    const handleSubmit = (e) => {    
        e.preventDefault();
        console.log("submit!");
        console.log(formData); 
        // const sellId = Number(e.target.id.value);
        // const sellQuantity = Number(e.target.quantity.value);
        
        // setFormData((prevStock) => {
        //     return prevStock.map((item) => {
        //         if(
        //             item.id === sellId &&
        //             item.quantity >= sellQuantity
        //         ) {
        //             return {
        //                 ...item,
        //                 quantity: item.quantity - sellQuantity,
        //             };
        //         }

        //         return item;
        //     });
        // });

        addCartItem(formData);
        // setFormData({ name: "", quantity: 0 })
        // setItem({ name: ""})
        // setFormData({
        //     name: "",
        //     quantity: "",
        //     price: "",
        // });
    };   



    return (
        <>
            <form name="selectedItem" method="" onSubmit={handleSubmit}>
                {/* <label name="selectedItem" /> */}
                <select name="item_name" value={formData.item_name} onChange={handleSelect}>
                    {/* <ItemListDataContext.Provider value={ItemListContexts}> */}
                        {/* {ItemListContexts.map((ilContext) => { */}
                    <option value="">商品を選択</option>

                    {stocks.map((s) => (
                        <option key={s.id} value={s.item_name}>
                            {s.item_name}
                        </option>
                    ))}
                </select>
                <p>在庫数：{selectedStock}</p>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                />
                <br />
                {/* <button type="reset">Reset</button> */}
                {/* <button type="submit" onClick={handleChange}>Submit</button> */}
                <button type="submit">カートに追加</button>
            </form>
        </>
    );
};

