import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";
import {
    ChakraBaseProvider,
    extendBaseTheme,
    theme as chakraTheme,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import "./assets/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <AppProvider> */}
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        {/* </AppProvider> */}
    </React.StrictMode>
);
