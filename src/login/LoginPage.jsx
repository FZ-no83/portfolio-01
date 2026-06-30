// npm install bcrypt
// aaa@email.com

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./LoginPage.css";

export const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log(email);
        console.log(password);
        
        try {
            const res = await fetch(
                "http://localhost:3001/loginPage",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );
            const data = await res.json();
            // console.log(data);
            // if (data.success) {
            if (res.ok){
                console.log("Login Success");
                toast.success("ログインしました");
                navigate("/DashboardPage");
            } else {
                toast.error(data.message);
            }
        } catch(error) {
            console.error(error);
            toast.error("メールアドレスまたはパスワードが違います")
        }
    };


    return(
        <div className="login-container">
            <div className="login-card">
                <h1>営業運営支援システム</h1>
                <input
                    className="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <br />
                <input 
                    className="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <br />
                <button 
                    className="login-btn"
                    onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};
