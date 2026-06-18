//import React from "react";
import React, { createContext } from "react";


const itemListData = [
    {
        id: "0",
        name: "-- --",
        quantity: "99",
    },    
    {
        id: "1",
        name: "Red",
        price: 100,
        quantity: "11",
    },
    {       
        id: "2",
        name: "Blue",
        price: 200,
        quantity: "22",
    },
    {       
        id: "3",
        name: "Yellow",
        price: 300,
        quantity: "33",
    },
];

const ItemListDataContext = createContext(itemListData);

export default ItemListDataContext;