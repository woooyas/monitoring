import "./Sidebar.css";
import {Link, NavLink} from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <div className="logo">
                    <span className="material-symbols-outlined">kid_star</span>
                    <Link to="/"><h5>Monitoring</h5></Link>
                </div>
                <NavLink to="/">
                    <span className="material-symbols-outlined">grid_view</span>
                    Dashboard</NavLink>
                <NavLink to="/sensors">
                    <span className="material-symbols-outlined">sensors</span>
                    Sensors</NavLink>
                <NavLink to="/sensor-data">
                    <span className="material-symbols-outlined">analytics</span>
                    SensorData</NavLink>
                <NavLink to="/settings">
                    <span className="material-symbols-outlined">settings</span>
                    Settings</NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;
