import "./Sidebar.css";
import {Link, NavLink} from "react-router-dom";

function Sidebar({sidebarOpen, toggleSidebar}) {
    return (
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <nav className="sidebar-nav">
                <div className="logo">
                    <span className="material-symbols-outlined">kid_star</span>
                    <Link to="/"><h5>Monitoring</h5></Link>
                    <button className="sidebar-close" onClick={toggleSidebar}>
                        <span className="material-symbols-outlined">close</span></button>
                </div>
                <NavLink to="/">
                    <span className="material-symbols-outlined">grid_view</span>
                    대시보드</NavLink>
                <NavLink to="/sensors">
                    <span className="material-symbols-outlined">sensors</span>
                    센서 목록</NavLink>
                <NavLink to="/sensor-data-graph">
                    <span className="material-symbols-outlined">monitoring</span>
                    데이터 그래프</NavLink>
                <NavLink to="/sensor-data">
                    <span className="material-symbols-outlined">analytics</span>
                    데이터 로그</NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;
