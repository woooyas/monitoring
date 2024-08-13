import "./Header.css";
import {useState} from "react";
import Sidebar from "../Sidebar/Sidebar";

function Header(props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="header" onClick={toggleSidebar}>
            <div className="menu"><span className="material-symbols-outlined">menu</span></div>
            <h1>{props.title}</h1>
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
        </div>
    );
}

export default Header;
