//\. "$HOME/.nvm/nvm.sh"
console.log("index.js loaded");
const express = require("express");
const cors = require("cors");

const itemListRouter = require("./routes/itemList");
const stockListRouter = require("./routes/stockList");
const salesListRouter = require("./routes/salesList");
const cartRouter = require("./routes/cart");

const salesRouter = require("./routes/salesList");
const purchaseRouter = require("./routes/purchaseList");

const dashboardRouter = require("./routes/dashboard");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Backend running!" });
});

app.use("/itemList", itemListRouter);
app.use("/stockList", stockListRouter);
app.use("/salesList", salesListRouter);
app.use("/cart", cartRouter);

app.use("/sales", salesRouter);
app.use("/purchaseList", purchaseRouter);

app.use("/dashboardPage", dashboardRouter);
app.use("/expense_list", dashboardRouter);

const PORT = 3001;

app.listen(PORT, (error) => {
    if(error) {
        console.log("Listen error:", error);
        return;
    }
    console.log(`Server running on port ${PORT}`);
});


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// Bash
// lsof -i :5000
// lsof -i -P | grep node

// TCP localhost:5173 (LISTEN)

// 
// TCP localhost:5173->localhost:53383 (FIN_WAIT_2)