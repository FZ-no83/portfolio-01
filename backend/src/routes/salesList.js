const express = require("express");
const router = express.Router();

const pool = require("../db/db");

router.get("/", async(req, res) => {
    try {
        console.log("API called: sales_list");
        const result = await pool.query("SELECT * FROM sales_list");
        console.log(result.rows);
        res.json(result.rows);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            error: "Server Error: sales_list",
        });
    }
});

// app.post("/sales", (req, res) => {
//     console.log("sales!");
// });

router.post("/", async(req, res) => {
    console.log("sales!");
    console.log(req.body);
    let totalPrice = 0;

    try {
        await pool.query("BEGIN");
        const aboutItems = [];
        for (const item of req.body){
            // console.log(item.item_number);
            // console.log(item.quantity);
            //バリデーション↓↓↓↓↓
            if(item.quantity <= 0) {
                throw new Error(
                    "数量が不正です"
                );
            }

            const stockResult = await pool.query(
                `
                SELECT quantity
                FROM stock_list
                WHERE item_number = $1
                `,
                [item.item_number]
            );
            if(stockResult.rows[0].quantity < item.quantity) {
                throw new Error("在庫不足");
            }

            aboutItems.push({
                item_number: item.item_number,
                item_name: item.item_name,
                quantity: item.quantity
            });

            const result = await pool.query(
                `
                SELECT price
                FROM item_list
                WHERE item_number = $1
                `,
                [item.item_number]
            );

            totalPrice += result.rows[0].price * item.quantity;
            console.log(totalPrice);

            await pool.query(
                `
                UPDATE stock_list
                SET quantity = quantity - $1
                WHERE item_number = $2
                `,
                [
                    item.quantity,
                    item.item_number
                ]
            );

            // item_json = [item.item_name:item.quantity];
        }

        const totalItems = req.body.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        console.log(totalItems);
        // throw new Error("トランザクションテスト");


        // INSERT INTO sales_list_error (
        // INSERT INTO sales_list (
        await pool.query(
            `
            INSERT INTO sales_list (
            total_price,
            total_items,
            sales_number,
            sales_datetime,
            about_items
            )
            VALUES(
            $1, $2, $3, $4, $5          
            )
            `,
            [
                totalPrice,
                totalItems,
                Date.now(), //salesNumber
                new Date(),
                JSON.stringify(aboutItems) // {"key": "value"}
            ]

        // [
        //     item.total_price,?
        //     item.total_items,?
        //     item.cart_id,
        //     item.purchase_datetime,?
        //     item_json?
        // ]
        );

        await pool.query("COMMIT");

        res.json({
            message: "販売完了",
            aboutItems,
        });
    
    } catch(error) {
        await pool.query("ROLLBACK");
        console.error(error);
        res.status(500).json({
            error: "販売失敗"
        });
    }


});

module.exports = router;
