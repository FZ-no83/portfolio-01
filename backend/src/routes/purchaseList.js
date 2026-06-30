const express = require("express");
const router = express.Router();

const pool = require("../db/db");

router.get("/", async(req, res) => {
    try {
        console.log("API called: purchase_list");
        const result = await pool.query("SELECT * FROM purchase_list");
        res.json(result.rows);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            error: "Sever Error: purchase_list",
        });
    }
});


router.post("/", async(req, res) => {
    // console.log("purchase!");
    // console.log(req.body);

    let totalPriceP = 0;

    try {
        await pool.query("BEGIN");
        const aboutItemsP = [];
        for (const item of req.body) {
            if(item.quantity <= 0) {
                throw new Error(
                    "数量が不正です"
                );
            }

            const addStock = await pool.query(
                `
                SELECT quantity
                FROM stock_list
                WHERE item_number = $1
                `,
                [item.item_number]
            );

            aboutItemsP.push({
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

            totalPriceP += result.rows[0].price * item.quantity;
            // console.log(totalPriceP);

            await pool.query(
                `
                UPDATE stock_list
                SET quantity = quantity + $1
                WHERE item_number = $2
                `,
                [
                    item.quantity,
                    item.item_number
                ]
            );
            
        } 

        const totalItemsP = req.body.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
        // console.log(totalItemsP);

        await pool.query(
            `
            INSERT INTO purchase_list (
            total_price,
            total_quantity,
            purchase_number,
            purchase_datetime,
            about_items
            )
            VALUES(
            $1, $2, $3, $4, $5
            )
            `,
            [
                totalPriceP,
                totalItemsP,
                Date.now(),
                new Date(),
                JSON.stringify(aboutItemsP)
            ]
        );

        await pool.query("COMMIT");

        res.json({
            message: "仕入れ完了",
            aboutItemsP,
        });
    } catch(error) {
        await pool.query("ROLLBACK");
        console.error(error);
        res.status(500).json({
            error: "仕入れ失敗"
        });
    }


});

module.exports = router;