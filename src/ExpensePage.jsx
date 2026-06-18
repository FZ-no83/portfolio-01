import React, { useState } from 'react';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList} from  './ExpenseList';
import { ExpenseModal } from './ExpenseModal';

export const ExpensePage = ({ dash }) => {
    // console.log(dashExpense);
    const dashExpenseItems = dash.expenseItems ?? [];
    const dashExpenseList = dash.expenseList ?? [];
    // console.log("ExpensePage");
    // console.log(dash);
    // console.log(dashExpenseItems);
    // console.log();

    const [ expenseData, setExpenseData ] = useState({
        expense_id: "",
        expense_name: "",
        category: "",
        amount: "",
        payment_date: "",
        memo: "",
    });

    const [ editExpense, setEditExpense ] = useState(null);
    const [ isOpen, setIsOpen ] = useState(false);
    // const addPayment = (newItem) =>{
    //     setExpenseData((prev) => [
    //         ...prev,
    //         newItem,
    //     ]);
    // }

    const handleInputExpense = async (e) => {
        e.preventDefault();
        console.log("入力実行");
        console.log(expenseData);
        await fetch(
            "http://localhost:3001/expense_list",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(expenseData),
            }
        );
        setExpenseData({
            expense_id: "",
            expense_name: "",
            category: "",
            amount: "",
            payment_date: "",
            memo: "",
        });
    }

    const handleEditExpense = async (e) => {
        e.preventDefault();
        console.log("編集実行");
        console.log(expenseData);
        await fetch(
            "http://localhost:3001/expense_list",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(expenseData),
            }
        );

        setIsOpen(false);

        setExpenseData({
            expense_id: "",
            expense_name: "",
            category: "",
            amount: "",
            payment_date: "",
            memo: "",
        });
        window.location.reload();
    }

    const removeInputExpense = async (list) => {
        console.log("１行削除");
        console.log(list);
        await fetch(
            "http://localhost:3001/expense_list",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(list),
            }
        );
    };

    // const setEditingExpense = (e) => {

    // };



    return(
        <>
            <h1>経費入力Page</h1>
            <ExpenseForm 
                dashExpenseItems={dashExpenseItems}
                // addPayment={addPayment}
                expenseData={expenseData}
                setExpenseData={setExpenseData}
                handleInputExpense={handleInputExpense}
            />
            <br />

            <ExpenseList 
                dashExpenseList={dashExpenseList}
                setIsOpen={setIsOpen}
                onEdit={(l)=>{
                    setEditExpense(l);
                    setIsOpen(true);
                }}
                removeInputExpense={removeInputExpense}
                

            />

        {isOpen && (
            <ExpenseModal
                dashExpenseItems={dashExpenseItems}
                editExpense={editExpense}
                handleEditExpense={handleEditExpense}
                closeModal={()=> setIsOpen(false)}
                expenseData={expenseData}
                setExpenseData={setExpenseData}
            />
        )};
        
        </>
    );
};

