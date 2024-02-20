import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { ConfigProvider, Switch, Typography } from "antd";
import { AppProvider } from "../src/store/AppContext";
import "./assets/styles/index.css";
import "@fontsource-variable/inter";
import '@fontsource-variable/hanken-grotesk';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProvider>
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: "Hanken Grotesk Variable",
                    },
                    components: {
                        Menu: {
                            iconSize: 20,
                            collapsedIconSize: 20,
                            itemBg: "#0D0D0D",
                            itemHeight: 40,
                            groupTitleColor: "#A9A9A9",
                            groupTitleFontSize: 13,
                            // itemColor: "#A9A9A9",
                            itemColor: "#6C6C6C",
                            itemHoverBg: "#17181C",
                            itemHoverColor: "#F6F6F6",
                            itemSelectedColor: "#FFEA7A",
                            itemSelectedBg: "#282828",
                            itemActiveBg: "#2D2F39",
                            subMenuItemBg: "#0D0D0D",
                            popupBg: "#0D0D0D",
                        },
                    },
                }}
            >
                <App />
            </ConfigProvider>
        </AppProvider>
    </React.StrictMode>
);
