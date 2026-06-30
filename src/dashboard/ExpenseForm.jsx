import React, { useState} from 'react';
import "./ExpensePage.css";

export const ExpenseForm = ({
    dashExpenseItems, 
    expenseData, 
    setExpenseData, 
    handleInputExpense
    }) => {

    console.log("dashExpenseItems");
    console.log(dashExpenseItems);

    // const [formData, setFormData] = useState({
    //     expense_name: "",
    //     category: "",
    //     amount: "",
    //     payment_date: "",
    //     memo: "",
    // });

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

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("handleSubmit!!!");
    //     console.log(formData);
    //     addPayment(formData);

    //     setFormData({
    //         expense_name: "",
    //         category: "",
    //         amount: "",
    //         payment_date: "",
    //         memo: "",
    //     });
    // };



    return(
        <div className="form-container">
            <div className="form-row">
                <form name="inputExpense" onSubmit={handleInputExpense}>
                    {/* <input 
                        type="text"
                        name="expense_name"
                        value={expenseData.expense_name}
                        onChange={handleChange}
                        placeholder="項目を入力"
                    />
                    <br /> */}
                    <label className="form-label">
                        経費項目：
                    </label>
                    <select 
                        className="expense-select"
                        name="expense_id" 
                        value={expenseData.expense_id ?? ""} 
                        onChange={handleSelect}
                    >
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
                    <label className="form-label">
                        カテゴリ：
                    </label>
                    <input 
                        className="form-input"
                        value={expenseData.category}
                        disabled
                    />
                    <br />
                    <label className="form-label">
                        支払金額：
                    </label>
                    <input 
                        className="form-input"
                        type="number"
                        name="amount"
                        value={expenseData.amount}
                        onChange={handleChange}
                        // placeholder="支払金額"
                    />
                    <br />
                    <label className="form-label">
                        支払日　：
                    </label>
                    <input
                        className="form-input" 
                        type="Date"
                        name="payment_date"
                        value={expenseData.payment_date}
                        onChange={handleChange}
                    />
                    <br />
                    <label className="form-label">
                        メモ　　：
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        name="memo"
                        value={expenseData.memo}
                        onChange={handleChange}
                        placeholder="詳細を入力"
                    />
                    <br />
                    <br />
                    <button 
                        className="expense-btn"
                        type="submit"
                    >
                        登録
                    </button>
                </form>
            </div>
        </div>
    );

};

//     INSERT INTO expense_master (id, expense_name, category, is_active)
// VALUES 
// (1, '家賃', '固定費', TRUE),
// (2, '電気代', '光熱費', TRUE);


// INSERT INTO expense_list 
// (id, expense_id, amount, payment_date, created_at, memo)
// VALUES 
// (1, 2, 3000, '2026-07-01', '2026-06-03 11:11:11', '電気代');
