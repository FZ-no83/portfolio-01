import React, { useState, useEffect } from 'react';

export const ExpenseModal = ({ 
    dashExpenseItems, 
    editExpense, 
    setIsOpen, 
    handleEditExpense,
    closeModal,
    expenseData,
    setExpenseData,
}) => { 
    // const [ expenseData, setExpenseData ] = useState({
    //     expense_id: "",
    //     expense_name: "",
    //     category: "",
    //     amount: 0,
    //     payment_date: "",
    //     payment_day: "",
    //     memo: "",
    // });
    console.log("ExpenseModal");
    console.log(editExpense);
    console.log(dashExpenseItems);

    useEffect(() => {
        if (!editExpense) return;

        setExpenseData({
            id: editExpense.id,
            expense_id: editExpense.expense_id,
            expense_name: editExpense.expense_name,
            category: editExpense.category,
            amount: editExpense.amount,
            payment_date: editExpense.payment_date.slice(0,10),
            payment_day: editExpense.payment_day,
            memo: editExpense.memo,
        });
    }, [editExpense]);




    const handleChange = (evt) => {
        setExpenseData({
            ...expenseData,
            [evt.target.name]: evt.target.value,
        });
    };

    const handleSelect = (e) => {
        console.log("e.target.value");
        console.log(e.target.value);
        const selected = dashExpenseItems.find(
            (i) => i.id === Number(e.target.value)
        );
        console.log("selected");
        console.log(selected);

        if (!selected) return;

        setExpenseData({
            ...expenseData,
            expense_id: selected.id,
            expense_name: selected.expense_name,
            category: selected.category,
            // amount: selected.amount,
            // payment_date: selected.payment_date,
            // memo: selected.memo,
        });
    };

    return (

        // handleInputExpense = (return);
        // handleSelect = (return) ;
        // handleChange = (return);

        <>
            <h3>経費編集</h3>
            <form name="editExpense" onSubmit={handleEditExpense}>
                <label>経費項目：</label>
                <select name="expense_id" value={expenseData.expense_id ?? ""} onChange={handleSelect}>
                    <option>
                        カテゴリーを選択
                    </option>
                    {dashExpenseItems.map((i) => (
                        <option key={i.id} value={i.id}>
                            {i.expense_name}
                        </option>
                    ))}
                </select>
                <br/>
                {/* <p>カテゴリ：{expenseData.category}</p> */}
                <label>カテゴリ：</label>
                <input 
                    value={expenseData.category}
                    disabled
                />
                <br />
                <label>支払金額</label>
                <input 
                    type="number"
                    name="amount"
                    value={expenseData.amount}
                    onChange={handleChange}
                    // placeholder="支払金額"
                />
                <br />
                <label>支払日：</label>
                <input 
                    type="Date"
                    name="payment_date"
                    value={expenseData.payment_date}
                    onChange={handleChange}
                />
                <br />
                <label>メモ</label>
                <br />
                <input 
                    type="text"
                    name="memo"
                    value={expenseData.memo}
                    onChange={handleChange}
                    placeholder="詳細を入力"
                />
                <br />
                <br />
                <button type="submit">編集</button>
                <br />
                <button
                    type="button"
                    onClick={closeModal}
                >
                    閉じる
                </button>
            </form>

        </>

    );

};
