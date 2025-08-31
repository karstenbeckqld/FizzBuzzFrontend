import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation.tsx";

// We're using react-router's MainLayout functionality, which hosts the Navigation for the whole app.

const MainLayout = () => {
    return (
        <>
            <Navigation />
            <div className='main-container'>
                <Outlet />
            </div>

        </>

    )
}

export default MainLayout