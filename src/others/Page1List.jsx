import { useState } from "react";
import { Page1ListForm } from "./Page1ListForm";
import { v4 as uuid } from "uuid"; 

export const Page1List = () => {
    const [items, setItems] = useState([
        {id: uuid(), product: "バナナ", quantity: 8 },
        {id: uuid(), product: "卵", quantity: 12 },
    ]);

    const addItem = (item) => {
        setItems((currItems) => {
            return [...currItems, {...item, id: uuid() }];
        });
    };

    return (
        <div>
            <Page1ListForm addItem={addItem} />
            <br />
            <br />
            <h2>買い物リスト</h2>
            <ul>
                {items.map((i) => (
                    <li key={i.id}>
                        {i.product} - {i.quantity}
                    </li>
                ))}
            </ul>
        </div>

    );
}  