import React from 'react';
import { Link } from "react-router-dom";
// import { ExpensePage } from './ExpensePage';
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


    return (
        <>
            <h1>Dashboard</h1>
            <div>
                <h3>総売上</h3>
                {console.log(typeof dash.totalSales)}
                <p>¥{(dash.totalSales ?? 0).toLocaleString()}</p>    
            </div>
            <div>
                <h3>総仕入</h3>
                <p>¥{(dash.totalPurchase ?? 0).toLocaleString()}</p>    
            </div><div>
                <h3>差額</h3>
                <p>¥{(dash.profit ?? 0).toLocaleString()}</p>    
            </div>
            <div>
                <h3>販売件数</h3>
                <p>{dash.salesCount ?? 0}件</p>    
            </div>
            <div>
                <h3>仕入件数</h3>
                <p>{dash.purchaseCount ?? 0}件</p>    
            </div>
            <div>
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
            {console.log(dash)}
            <div>
                <Link to="/expense">ーー 経費操作 ーー</Link>
            </div>

            <div>
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
                        dataKey="profit"
                        name="利益"
                        stroke="#22c55e"
                        strokeWidth={3}
                        strokeDasharray="13 10"
                        dot={false}
                    />
                    <Legend />
                </LineChart>
            </div>
            <div>
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
                    <Tooltip 
                        formatter={(value) =>
                            `¥${value.toLocaleString()}`
                        }
                    />
                    <Line
                        type="monotone"
                        dataKey="cash"
                        name="現金"
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
                        dataKey="profit"
                        name="利益"
                        stroke="#22c55e"
                        strokeWidth={3}
                        strokeDasharray="13 10"
                        dot={false}
                    />
                    <Legend />
                </LineChart>
            </div>

            {/* <ul>
                {dash.map((d)  => (
                    <li key={d.id}>
                        {console.log(d)}
                        {d.sales_number}
                    </li>
                ))}

            </ul> */}
        </>
    );
};
