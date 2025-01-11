import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"

import "react-toastify/dist/ReactToastify.css"

import { UserWrapper } from "./context/UserWrapper.js"
import { ToastContainer } from "react-toastify"
import App from "./App.js"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

if (__DEV__) {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <UserWrapper>
            <QueryClientProvider client={queryClient}>
                <ToastContainer />
                <App />
            </QueryClientProvider>
        </UserWrapper>
    )
} else {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <UserWrapper>
                    <ToastContainer />
                    <App />
                </UserWrapper>
            </QueryClientProvider>
        </React.StrictMode>
    )
}
