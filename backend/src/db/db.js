const { Pool } = require("pg");

const pool = new Pool({
    // user: "postgres",
    user: "naoyaogino",
    host: "localhost",
    database: "postgres",
    password: "",
    port: 5432,
});

pool.connect((error) => {
    if (error) {
        console.log("DB conection error:", error);
    } else {
        console.log("DB connected!");
    }
});

module.exports = pool;

