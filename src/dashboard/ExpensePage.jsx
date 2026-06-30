import React, { useState } from 'react';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList} from  './ExpenseList';
import { ExpenseModal } from './ExpenseModal';
import toast from "react-hot-toast";
import "./ExpensePage.css";

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
        try {
            const res = await fetch(
                "http://localhost:3001/expense_list",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(expenseData),
                }
            );

            if (!res.ok) {
                throw new Error("経費編集・更新失敗");
            }

            toast.success("編集しました");

            // getExpenseList();
            // closeModal();
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
        } catch(error) {
            toast.error("編集に失敗しました");
            console.error(error);
        }
    };

    const removeInputExpense = async (list) => {
        console.log("１行削除");
        console.log(list);

        try {
            const res = await fetch(
                "http://localhost:3001/expense_list",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(list),
                }
            );

            if (!res.ok) {
                throw new Error("経費削除・更新失敗");
            }

            toast.success("削除しました");
            window.location.reload();

        } catch(error) {
            toast.error("更新に失敗しました");
            console.error(error);
        }

    };


    // const setEditingExpense = (e) => {

    // };



    return(
        <div className="expense-container">
            <h1>経費管理</h1>
            <div className="expense-register">
                <ExpenseForm 
                    dashExpenseItems={dashExpenseItems}
                    // addPayment={addPayment}
                    expenseData={expenseData}
                    setExpenseData={setExpenseData}
                    handleInputExpense={handleInputExpense}
                />
            </div>
            <div>
                <ExpenseList 
                    dashExpenseList={dashExpenseList}
                    setIsOpen={setIsOpen}
                    onEdit={(l)=>{
                        setEditExpense(l);
                        setIsOpen(true);
                    }}
                    removeInputExpense={removeInputExpense}
                />
            </div>
            <div className="expense-modal">
                {isOpen && (
                    <ExpenseModal
                        dashExpenseItems={dashExpenseItems}
                        editExpense={editExpense}
                        handleEditExpense={handleEditExpense}
                        closeModal={()=> setIsOpen(false)}
                        expenseData={expenseData}
                        setExpenseData={setExpenseData}
                    />
                )}
            </div>
        </div>
    );
};

