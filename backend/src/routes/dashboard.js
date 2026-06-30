const express = require("express");
const router = express.Router();

const pool = require("../db/db");

router.get("/", async(req, res) => {
    try {
    //     console.log("API called dashboard");
        const salesResult = await pool.query(
            `
                SELECT
                    COALESCE(SUM(total_price), 0) AS total_sales,
                    COUNT(*) AS sales_count
                FROM sales_list
            `
        );
        const purchaseResult = await pool.query(
            `
                SELECT
                    COALESCE(SUM(total_price), 0) AS total_purchase,
                    COUNT(*) AS purchase_count
                FROM purchase_list
            `
        );
        // console.log(salesResult.rows);
        // console.log(purchaseResult.rows);

        const lowStockResult = await pool.query(
            `
                SELECT
                    item_number,
                    item_name,
                    quantity
                FROM stock_list
                WHERE quantity <= 10
                ORDER BY quantity ASC
            `
        );
        // console.log(lowStockResult.rows);

        const salesData = await pool.query(
            `
                SELECT
                    TO_CHAR(
                        sales_datetime,
                        'YYYY/MM/DD'
                    ) AS day,
                    
                    SUM(total_price)::INTEGER AS sales

                FROM sales_list

                GROUP BY
                    TO_CHAR(
                        sales_datetime,
                        'YYYY/MM/DD'
                    )
                
                ORDER BY day
            `
                // SELECT
                //     DATE(purchase_datetime) AS day,
                //     SUM(total_price) AS sales
                // FROM sales_list
                // GROUP BY DATE(purchase_datetime)
                // ORDER BY day;
        );
        // console.log("sales Array");
        // console.log(salesData);

        const purchaseData = await pool.query(
            `
                SELECT
                    TO_CHAR(
                        purchase_datetime,
                        'YYYY/MM/DD'
                    ) AS day,
                    
                    SUM(total_price)::INTEGER AS purchase

                FROM purchase_list

                GROUP BY
                    TO_CHAR(
                        purchase_datetime,
                        'YYYY/MM/DD'
                    )
                
                ORDER BY day
            `
        );
        // console.log("purchase Array");
        // console.log(purchaseData);

        const expenseData = await pool.query(
            `
                SELECT
                    TO_CHAR(
                        payment_date,
                        'YYYY/MM/DD'
                    )AS day,

                    SUM(amount)::INTEGER AS expense
                FROM expense_list
                GROUP BY
                    TO_CHAR(
                        payment_date,
                        'YYYY/MM/DD'
                    )
                ORDER BY day;
            `
        )
        // console.log("expenseData");
        // console.log(expenseData);

        const balanceOfPayment = {};

        for(const row of salesData.rows) {
            balanceOfPayment[row.day] = {
                day: row.day,
                //売上
                total_sales: row.sales,
                //仕入
                total_purchase: 0,
                //経費（日次）
                total_expense: 0,
                //粗利（日次）                
                gross_profit: row.sales,
                //利益（日次）
                profit: row.sales,
                //累積現金
                cash: 0,
            };
        }

        for(const row of purchaseData.rows) {
            if (balanceOfPayment[row.day]) {
                balanceOfPayment[row.day].total_purchase += row.purchase;
                balanceOfPayment[row.day].gross_profit -= row.purchase;
                balanceOfPayment[row.day].profit -= row.purchase;
            } else {
                balanceOfPayment[row.day] = {
                    day: row.day,
                    total_sales: 0,
                    total_purchase: row.purchase,
                    total_expense: 0,
                    gross_profit: 0 - row.purchase,
                    profit: 0 - row.purchase,
                    cash: 0,
                };
            }
        }


        for (const row of expenseData.rows) {
            if (balanceOfPayment[row.day]) {
                balanceOfPayment[row.day].total_expense = row.expense;
                balanceOfPayment[row.day].profit -= row.expense;
            } else {
                balanceOfPayment[row.day] = {
                    day: row.day,
                    total_salse: 0,
                    total_purchase: 0,
                    total_expense: row.expense,
                    gross_profit: 0,
                    profit: 0 - row.expense,
                    cash: 0,
                };
            }
        }

        // console.log("balanceOfPayment");
        // console.log(balanceOfPayment);

        const expenseMaster = await pool.query(
            `
            SELECT * FROM expense_master
            `

        );

        const expenseInputData = await pool.query(
            // `
            //     SELECT * FROM expense_list
            // `
            `
                SELECT
                    el.id,
                    el.expense_id,
                    em.expense_name,
                    em.category,
                    el.amount,
                    el.payment_date,
                    TO_CHAR(
                        el.payment_date,
                        'YYYY/MM/DD'
                    )AS payment_day,
                    el.memo
                FROM expense_list el

                JOIN expense_master em
                ON el.expense_id = em.id

                ORDER BY payment_date;
            `

        );
        // const expensePaymentDate = await pool.query(
        //     `
        //         SELECT
        //             id,
        //             TO_CHAR(
        //                 payment_date,
        //                 'YYYY/MM/DD'
        //             )AS payment_day
        //         FROM expense_list
        //     `
        // )
        // const expenseListAddMaster = {}
        // for (const row of expenseInputData.rows) {
        //     expenseListAddMaster[row.id] = {
        //         ...row,
        //         expense_name: expenseMaster.rows[row.expense_id].expense_name,
        //     }
        // }
        // console.log("expenseListAddMaster");
        // console.log(expenseInputData);

        // for(const row of expensePaymentDate.rows) {
        //     if (expenseInputData.rows[id] === row.id) {
        //         expenseInputData[id].payment_date = row[id];
        //     }
        // }

        const salesTopData = await pool.query(
            `
                SELECT
                    item->>'item_name' AS item_name,
                    SUM(
                        (item->>'quantity')::int
                    ) AS total
                FROM sales_list,
                LATERAL
                    json_array_elements(about_items) AS item
                WHERE
                    sales_datetime >= CURRENT_DATE - INTERVAL '30 days'
                GROUP BY
                    item_name
                ORDER BY
                    total DESC
                LIMIT 3;
            `
        );
        // console.log("salesTopData");
        // console.log(salesTopData);
        const salesTopItems = salesTopData.rows;

        const longStockData = await pool.query(
            `
                SELECT
                    item_name,
                    quantity,
                    TO_CHAR(
                        delivery_date,
                        'YYYY/MM/DD'
                    )AS stock_date,
                    CURRENT_DATE - delivery_date AS stock_days
                FROM stock_list
                WHERE quantity > 0
                ORDER BY stock_days ASC
                LIMIT 5;
            `
        );
        // console.log("agingInventoryData");
        // console.log(longStockData);
        const agingInventory = longStockData.rows;


        const lowStockCount = Number(lowStockResult.rows.length);

        const totalSales = 
            Number(salesResult.rows[0].total_sales);
        const salesCount = 
            Number(salesResult.rows[0].sales_count);
        const totalPurchase =
            Number(purchaseResult.rows[0].total_purchase);
        const purchaseCount = 
            Number(purchaseResult.rows[0].purchase_count);

        const profit =
            Number(totalSales - totalPurchase);
        
        const balanceOfPaymentNum = Object.values(balanceOfPayment);
        balanceOfPaymentNum.sort(
            (a, b) =>
                new Date(a.day) - new Date(b.day)
        );
        //累積現金の計算
        let cash = 0;
        for(const row of balanceOfPaymentNum) {
            cash += row.profit;
            row.cash = cash;
        };
        // console.log("balanceOfPaymentNum");
        // console.log(balanceOfPaymentNum);
        // const cashflowNum = cashflowData.rows;

        const expenseItems = expenseMaster.rows;
        const expenseList = expenseInputData.rows;
        // console.log(expenseList);


        res.json({
            totalSales,
            totalPurchase,
            profit,
            salesCount,
            purchaseCount,
            lowStockItems: lowStockResult.rows,
            lowStockCount,
            balanceOfPaymentNum,
            expenseItems,
            expenseList,
            salesTopItems,
            agingInventory,
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            error: "Server Error",
        });
    }
});


router.post("/", async(req, res) => {
    console.log("expense!!!");
    console.log(req.body);
    const {
        expense_id,
        amount,
        payment_date,
        memo,
    } = req.body;

    try {
        await pool.query("BEGIN");
        await pool.query(
            `
            INSERT INTO expense_list (
                expense_id,
                amount,
                payment_date,
                created_at,
                memo
            )
            VALUES(
                $1, $2, $3, $4, $5
            )
            `,
            [
                expense_id,
                Number(amount),
                payment_date,
                new Date(),
                memo
            ]
        );
        await pool.query("COMMIT");
        res.json({
            message: "経費登録完了"
        });
    } catch(error) {
        await pool.query("ROLLBACK");
        console.error(error);
        res.status(500).json({
            error: "経費登録失敗"
        });
    }
});

router.put("/", async(req, res) => {
    console.log("PUT for Expense");
    console.log(req.body);
    const {
        expense_id,
        amount,
        payment_date,
        memo,
        id,
    } = req.body;    

    try {
        await pool.query("BEGIN");
        await pool.query(
            `
            UPDATE expense_list
            SET
                expense_id = $1,
                amount = $2,
                payment_date = $3,
                created_at = $4,
                memo  = $5
            WHERE id = $6
            `,
            [
                expense_id,
                Number(amount),
                payment_date,
                new Date(),
                memo,
                id,
            ]
        );
        await pool.query("COMMIT");
        res.json({
            message: "経費編集編完了"
        });
    } catch(error) {
        await pool.query("ROLLBACK");
        console.error(error);
        res.status(500).json({
            error: "経費編集失敗"
        });
    }

});

router.delete("/", async(req, res) => {
    // console.log("expense DELETE!!!");
    // console.log(req.body);
    const{id} = req.body;

    try {
        await pool.query("BEGIN");
        await pool.query(
            `
                DELETE FROM expense_list
                WHERE id = $1
            `,
            [id]
        );
        await pool.query("COMMIT");
        res.json({message: "経費データ削除完了"});
        } catch(error) {
            await pool.query("ROLLBACK");
            console.error(error);
            res.status(500).json({
            message: "経費データ削除失敗"
        });
            
        }
    
});

module.exports = router;
