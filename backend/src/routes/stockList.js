const express = require("express");
const router = express.Router();

const pool = require("../db/db");

router.get("/", async (req, res) => {
    try {
        console.log("API called: stock_list");
        const result = await pool.query("SELECT * FROM stock_list");
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
