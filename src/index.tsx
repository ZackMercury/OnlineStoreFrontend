import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import React from "react";
import { createRoot } from 'react-dom/client'
import axios from "axios";

const container = document.getElementById("app");
const root = createRoot(container!);

axios.defaults.withCredentials = true;

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

