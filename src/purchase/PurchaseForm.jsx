import React, { useState } from "react";
// import React, { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
// import ItemListDataContext from "./data/itemListData";
import "./PurchasePage.css";


export const PurchaseForm = ({ itemList, addCartItem }) => {
    // const items = useContext(ItemListDataContext);
    // const [item, setItem] = useState({name: "バナナ", quantity: 1, price: 100});
    const [formData, setFormData] = useState({
            item_name: "",
            quantity: 1,
            price: 0,
            // ...item, #オブジェクト
            // item_name: selected.item_name,
            // price: selected.price,
    });

    // const items = [
    //     { name: "バナナ", price: 100 },
    //     { name: "卵", price: 30 },
    //     { name: "りんご", price: 150 },
    // ];

    const handleChange = (evt) => {
        setFormData({
            ...formData, 
            [evt.target.name]: Number(evt.target.value),
        });

    };

    const handleSelect = (e) => {
        // const selected = items.find((i) => i.name === e.target.value);
        const selected = itemList.find(
            (i) => i.item_name === e.target.value
        );
        
        console.log(selected);

        if (!selected) return;
        
        setFormData({
            ...formData,
            id: selected.id,
            item_number: selected.item_number,
            item_name: selected.item_name,
            price: selected.price,
        });
    };

    const handleSubmit = (e) => {    
        e.preventDefault();
        console.log("handleSubmit!!!");
        console.log(formData);
        // addItem(formData);
        addCartItem(formData);
        // setFormData({ name: "", quantity: "" })
        // setItem({ name: ""})
        setFormData({
            item_name: "",
            quantity: 1,
            price: 0,
        });
    };   


    // console.log(itemList);

    return (
        <>

            <form name="selectedItem" method="" onSubmit={handleSubmit}>
                <div className="purchase-form">
                {/* <label name="selectedItem" /> */}
                {/* <select name="selectedItem" value={item.name} onChange={handleSelect}> */}
                    <select
                        className="purchase-select" 
                        name="item_name" 
                        value={formData.item_name} 
                        onChange={handleSelect}
                    >
                        <option value="">
                            商品を選択
                        </option>
                        {/* <ItemListDataContext.Provider value={ItemListContexts}> */}
                            {/* {ItemListContexts.map((ilContext) => { */}
                        {itemList.map((i) => (
                            <option key={i.id} value={i.item_name}>
                                {i.item_name}
                            </option>
                        ))}
                    </select>
                    {/* <div className="purchase-num"> */}
                    <input
                        className="purchase-num"
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                    <a>個</a>
                    {/* </div> */}
                    {/* <button type="reset">Reset</button> */}
                    {/* <button type="submit" onClick={handleChange}>Submit</button> */}
                    <button 
                    className="purchase-add"
                        type="submit"
                    >
                        追加
                    </button>
                </div>
            </form>
        
        </>
    );
};