import React from 'react';

export const ExpenseList = ({
    dashExpenseList, 
    removeInputExpense, 
    setEditExpense, 
    setIsOpen,
    onEdit
    }) => {

    return(
        <>
            <p> -- Expense List -- </p>
            <ul>
                {dashExpenseList.map((l) => {
                    return(
                        <li key={l.id}>
                            {l.payment_day}: ¥{l.amount}: {l.expense_name}: {l.category}
                            <button 
                                onClick={() => {
                                    onEdit(l);
                                    // setEditExpense(l)
                                }}
                            >
                                編集
                            </button>
                            <a>sp</a>
                            <button onClick={() => removeInputExpense(l)}>
                                削除
                            </button>
                        </li>

                    );
                })};
            </ul>

        </>
    );
};