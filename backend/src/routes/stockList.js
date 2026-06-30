const express = require("express");
const router = express.Router();

const pool = require("../db/db");

router.get("/", async (req, res) => {
    try {
        console.log("API called: stock_list");
        const result = await pool.query(
            `
                SELECT
                    sl.id,
                    sl.item_number,
                    sl.item_name,
                    sl.quantity,
                    il.price,
                    TO_CHAR(
                        sl.delivery_date,
                        'YYYY/MM/DD'
                    ) AS day
                FROM stock_list sl

                JOIN item_list il
                ON sl.item_number = il.item_number

                ORDER BY delivery_date
            `
        );
        console.log("stock_list");
        console.log(result.rows);
        res.json(result.rows);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error: "Seerver Error: stock_list",
        });
    }
});

module.exports = router;
