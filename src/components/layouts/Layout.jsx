import styles from "./Layout.module.css"
import Header from "./Header"
import Footer from "./Footer"
import { Outlet, useLocation } from "react-router-dom"

const Layout = () => {
    const { pathname } = useLocation();
    const esInicio = pathname === "/";

    return (
        <div className={styles.mainWrapper}>
            <Header />
            <main className={`${styles.content} ${esInicio ? styles.fullWidth : ""}`}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout