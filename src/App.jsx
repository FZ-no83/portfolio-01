//\. "$HOME/.nvm/nvm.sh"  
// npm create vite@latest   
//npm run dev

import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from "react-router-dom";
// import { BrowserRouter, Link, Route } from "react-router-dom";
//import { Router } from "./Router";
import { Home } from './Home';
import { PurchasePage } from './PurchasePage';
import { SalesPage } from './SalesPage';
import { DashboardPage } from './DashboardPage';
import { ExpensePage } from './ExpensePage';
import "./App.css";

export default function App() {

    const [itemList, setItemList ] = useState([]);
    const [stockList, setStockList] = useState([]);
    const [salesList, setSalesList] = useState([]);
    const [cart, setCart] = useState([]);
    const [purchaseList, setPurchaseList] = useState([]);
    const [dash, setDash] = useState({});

    useEffect(() => {
        fetch("http://localhost:3001/itemList")
            .then(res => {
                console.log("Response:", res);
                return res.json();
            })
            .then(data => {
                console.log("Data:", data);
                setItemList(data);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3001/stockList")
            .then(res => res.json())
            .then(data => setStockList(data));

        fetch("http://localhost:3001/salesList")
            .then(res => res.json())
            .then(data => setSalesList(data));
        
        fetch("http://localhost:3001/cart")
            .then(res => res.json())
            .then(data => setCart(data));
        fetch("http://localhost:3001/purchaseList")
            .then(res => res.json())
            .then(data => setPurchaseList(data));
        fetch("http://localhost:3001/dashboardPage")
            .then(res => res.json())
            .then(data => setDash(data));

    }, []);


    console.log(stockList[0]?.item_name);
    // useEffect(() => {
    //     fetch("http://localhost:3001/itemList")
    //         .then((res) => {
    //             console.log(res);
    //             if(!res.ok) {
    //                 throw new Error("HTTP Error");
    //             }
    //             return res.json();
    //         })
    //         .then((data) => { 
    //             console.log(data);
    //             setItemList(data); 
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);


    return (
        // <BrowserRouter>
        <>
            <div className='App'>
                <Link to="/">Home</Link>
                <br />
                <Link to="/Purchasepage">Purchase</Link>
                <br />
                <Link to="/salesPage">SalesPage</Link>
                <br />
                <Link to="/DashboardPage">DashboardPage</Link>
                <br />
            </div>

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route 
                    exact path="/Purchasepage" 
                    element={
                        <PurchasePage 
                            stockList={stockList} 
                            itemList={itemList} 
                        />
                    }
                />
                <Route exact path="/salesPage" 
                    element={
                        <SalesPage
                            stockList={stockList}
                            cart={cart}
                            itemList={itemList} 
                        />
                    }  
                />
                <Route exact path="/DashboardPage"
                    element={
                        <DashboardPage
                            dash={dash}
                        />
                    }
                />
                <Route 
                    path="/expense"
                    element={
                        <ExpensePage
                            dash={dash}
                            // dashExpenseItems={dash.expenseItems}
                            // dashExpenseList={dash.expenseList}
                        />
                    } 
                />
            </Routes>

            {/* <p>-- API(app) --</p>
            {itemList.map((il) => (
                <div key={il.id}>
                    <p>{il.item_name}</p>
                    <p>{il.price}</p>
                </div>
                ))} */}

        </>
        // </BrowserRouter>
    );
}

