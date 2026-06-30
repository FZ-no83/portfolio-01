import React from 'react';

export const ExpenseList = ({
    dashExpenseList, 
    removeInputExpense, 
    setEditExpense, 
    setIsOpen,
    onEdit
    }) => {

    return(
        <div className="expense-list">
            <h3> 登録経費一覧 </h3>
            {/* <ul>
                {dashExpenseList.map((l) => {
                    return(
                        <li key={l.id}>
                            {l.payment_day}: ¥{l.amount}: {l.expense_name}: {l.category} */}
            <div className="expense-table">
                <table>
                    <thead>
                        <th>項目</th>
                        <th>金額</th>
                        <th>日付</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                    {dashExpenseList.map((l) => {
                        return(
                            <tr key={l.id}>
                                <td>{l.category}：{l.expense_name}</td>
                                <td>¥{l.amount}</td>
                                <td>{l.payment_day}</td>
                                <td>
                                    <button 
                                        className="edit-btn"
                                        onClick={() => {
                                            onEdit(l);
                                            // setEditExpense(l)
                                        }}
                                    >
                                        編集
                                    </button>
                                    <a>  </a>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => removeInputExpense(l)}
                                    >
                                        削除
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            {/* </ul> */}
            </div>
        </div>
    );
};