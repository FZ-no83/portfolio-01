import React, { useState, useContext } from "react";
import { PurchaseForm } from "./PurchaseForm";
import { v4 as uuid } from "uuid";
//import StockDataContext from "./data/stockData";
// import ItemListDataContext from "./data/itemListData";
//import ItemListDataContext from "./data/itemListData";


export const PurchaseCart = ({itemList}) => {
    //const StockContexts = useContext(StockDataContext);
    //const ItemListContexts = useContext(ItemListDataContext);

    const [formData, setFormData] = useState([
        {id: uuid(), item_name: "バナナ", quantity: 8, price: 100 },
        {id: uuid(), item_name: "卵", quantity: 12, price: 30 }, 
        ]);

    //追加処理
    const addItem = (newItem) => {
        setFormData((prev) => [...prev, { ...newItem, id: uuid() }]);
    };

    // const addItem = (item) => {
    //     setFormData((currData) => {
    //         return [
    //             ...currData, 
    //             { item, id: uuid() }
    //         ];
    //     });

    // const [totalP, setTotalP] = useState(1000);
    const totalP = formData.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
    );

        // setTotalP((currItems) => {
        //     return totalP+setTotalP;
        // })

    return (
        <div>
            <h3>入力フォーム</h3>
            <PurchaseForm addItem={addItem} itemList={itemList} />
            <br />
{/** ヘッダー：Naviバー. */}
            <h3>Page3Cart.jsx</h3>
            <br />
{/** 合計金額＋確定ボタン（できれば移動バー */}

{/** 仕入れの一覧 */}
            <p>InputList</p>
            {/* {const total = aaa;} */}
            <ul>
                {formData.map((i) => (
                    <li key={i.id}>
                        {i.item_name} x {i.quantity} : ¥{i.price*i.quantity}-
                    </li>
                ))}
            </ul>
            <p>---- Total: ¥{totalP} ----</p>


        </div>
    );
};
