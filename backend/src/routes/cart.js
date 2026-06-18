const express = require("express");
const router = express.Router();

const pool = require("../db/db");

router.get("/", async(req, res) => {
    try{
        console.log("API called: cart");
        const result = await pool.query("SELECT * FROM cart");
        console.log(result.rows);
        res.json(result.rows);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            error: "Server Error",
        });
    }
});

module.exports = router;
