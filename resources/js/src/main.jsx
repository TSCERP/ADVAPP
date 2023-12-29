import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider, Typography } from "antd";
import "./assets/styles/index.css";
import '@fontsource-variable/inter';
import "./assets/styles/index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Inter Variable',
                },
            }}
        >
            <App />
        </ConfigProvider>
    </React.StrictMode>
);
