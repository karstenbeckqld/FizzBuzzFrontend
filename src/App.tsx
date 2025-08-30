import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout.tsx";
import Home from "./pages/Home.tsx";
import Admin from "./pages/Admin.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path = "/" element = {<MainLayout />}>
            <Route index element = {<Home />} />
            <Route path = "admin" element = {<Admin />} />
        </Route>
    )
)

function App() {

    return (
        <RouterProvider router = {router} />
    )
}

export default App
