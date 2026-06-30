import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { ExpensePage } from './ExpensePage';
import "./DashboardPage.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
// npm install recharts

// ③ node_modules再生成
// rm -rf node_modules
// rm package-lock.json

// npm install


export const DashboardPage = ({ dash }) => {
    const navigate = useNavigate();

    console.log("dash.salesTopItems");
    console.log(dash.salesTopItems);
    // const sti = dash.salesTopItems.row[0];
    // console.log(sti);
    // const sampleData = [
    //     {
    //         day: "Mon",
    //         sales: 1000,
    //     },
    //     {
    //         day: "Tue",
    //         sales: 2000,
    //     },
    //     {
    //         day: "Wed",
    //         sales: 1500,
    //     },
    // ];


    const handleLogout = () => {
        toast.success("ログアウトしました");
        navigate("/loginPage");
    };



    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            
            <div className="kpi-container">
                <div className="dashboard-card">
                    <h3>総売上</h3>
                    {console.log(typeof dash.totalSales)}
                    <p>¥{(dash.totalSales ?? 0).toLocaleString()}</p>    
                </div>
                <div className="dashboard-card">
                    <h3>総仕入</h3>
                    <p>¥{(dash.totalPurchase ?? 0).toLocaleString()}</p>    
                </div>
                <div className="dashboard-card">
                    <h3>差額</h3>
                    <p>¥{(dash.profit ?? 0).toLocaleString()}</p>    
                </div>
                <div className="dashboard-card">
                    <h3>販売件数</h3>
                    <p>{dash.salesCount ?? 0}件</p>    
                </div>
                <div className="dashboard-card">
                    <h3>仕入件数</h3>
                    <p>{dash.purchaseCount ?? 0}件</p>    
                </div>
                <div className="dashboard-card">
                    <h3>在庫不足商品</h3>
                        <p>対象商品：{dash.lowStockCount}件</p>
                        <ul>
                            {dash.lowStockItems?.map((item) => (
                                <li key={item.item_number}>
                                    ⚠{item.item_name}（残り {item.quantity}個）
                                </li>
                            ))}
                        </ul>
                </div>
            </div>
            {console.log(dash)}
            <div className="action-area">
                <Link
                    className="expense-button"
                    to="/expense"
                >
                    経費管理
                </Link>
            </div>

            <div className="chart-card">
                <h3>売上推移（日次）</h3>
                <LineChart
                    width={700}
                    height={300}
                    // data={sampleData}
                    data={dash.balanceOfPaymentNum}
                >
                    <XAxis dataKey="day" />
                    <YAxis 
                        tickFormatter={
                            (value) =>
                                value.toLocaleString()
                        }
                    />
                    <Tooltip 
                        formatter={(value) =>
                            `¥${value.toLocaleString()}`
                        }
                    />
                    <Line
                        type="monotone"
                        dataKey="total_sales"
                        name="売上"
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="total_purchase"
                        name="仕入"
                        stroke="#ef4444"
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="gross_profit"
                        name="売上総利益"
                        stroke="#22c55e"
                        strokeWidth={3}
                        strokeDasharray="13 10"
                        dot={false}
                    />
                    <Legend />
                </LineChart>
            </div>
            <div className="chart-card">
                <h3>キャッシュフロー（日次）</h3>
                <LineChart
                    width={700}
                    height={300}
                    data={dash.balanceOfPaymentNum}
                >
                    <XAxis dataKey="day" />
                    <YAxis 
                        tickFormatter={
                            (value) =>
                                value.toLocaleString()
                        }
                    />
                    <YAxis yAxisId="left" />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                    />
                    <Tooltip 
                        formatter={(value) =>
                            `¥${value.toLocaleString()}`
                        }
                    />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="cash"
                        name="現金"
                        strokeWidth={2}
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="total_purchase"
                        name="仕入"
                        stroke="#ef4444"
                        strokeWidth={2}
                    />
                    <Line
                        yAxisId="right" 
                        type="monotone"
                        dataKey="total_expense"
                        name="経費"
                        stroke="orange"
                        strokeWidth={2}
                        strokeDasharray="13 10"
                        dot={false}
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="total_sales"
                        name="入金"
                        stroke="#22c55e"
                        strokeWidth={3}
                    />
                    {/* <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="profit"
                        name="営業利益"
                        stroke="gray"
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        dot={false}
                    /> */}
                    <Legend />
                </LineChart>
            </div>
            <div className="bottom-container">
                <div className="dashboard-card">
                    <h3>売上TOP３</h3>
                    <ul>
                        {(dash.salesTopItems ?? []).map((t, index) => (
                            // <li key={t.item_name}>{t.item_name}: {t.total}個</li>
                            <li key={t.item_name}>
                                {index + 1}位<a>  </a>
                                {t.item_name}<a> :</a>
                                {t.total}個
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard-card">
                    <h3>長期在庫一覧</h3>
                    <ul>
                        {(dash.agingInventory ?? []).map((i) => (
                            <li key={i.item_name}>
                                {i.item_name}x{i.quantity}個<a>  </a>
                                入荷日:{i.stock_date}<a>    </a>
                                滞留{i.stock_days}日
                            </li>
                        ))}
                    </ul>
                </div>            {/* <ul>
                {dash.map((d)  => (
                    <li key={d.id}>
                        {console.log(d)}
                        {d.sales_number}
                    </li>
                ))}
            </ul> */}
            </div>
            <div className="logpout-area">
                <button 
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
