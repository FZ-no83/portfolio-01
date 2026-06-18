import React, { createContext } from "react";
//import Page2 from "./Page2";
//import ReactDOM from "react-dom/client";
//import { createRoot } from "react-dom/client";

//const testData = { id: "1", name: "aaa" };
const stockData = [
    {
            id: "1",
            name: "aaa",
            quantity: "11",
        },
        {       
            id: "2",
            name: "bbb",
            quantity: "22",
        },
        {       
            id: "3",
            name: "ccc",
            quantity: "33",
        },
    ];
export const stockDataContext = createContext(stockData);

export default stockData;