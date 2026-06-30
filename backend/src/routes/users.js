const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const pool = require("../db/db");

// const bcrypt = require("bcrypt");

// (async () => {
//     const hash = await bcrypt.hash("aaaa", 10);
//     console.log(hash);
// })();


router.post("/", async(req, res) => {
    console.log("login-post");
    console.log(req.body);
    

    const {
        // username,
        email,
        password,
    } = req.body;

    try {
    //     // await pool.query("BEGIN");
        const result = await pool.query(
            `
                SELECT *
                FROM users
                WHERE email = $1;
            `,
            [ email ]
        );
        console.log("Login Data");
        console.log(result.rows);

        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({
                succsess: false,
                message: "ユーザーが存在しません"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "パスワードが違います"
            });
        }
        console.log(isMatch);

        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                role: user.roll,
            }
        });

        // bcrypt.compare(
        //     password,
        //     result.rows[0].password_hash
        // );

    } catch(error) {
        console.error(error);
        res.status(500).json({
            success: false,
        });
    }

});



module.exports = router;
