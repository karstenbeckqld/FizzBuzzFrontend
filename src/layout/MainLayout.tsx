import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation.tsx";

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