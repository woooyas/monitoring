import './App.css';
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import NotFound from "./NotFound";
import Sensors from "./Components/Sensors/Sensors";
import SensorData from "./Components/SensorData/SensorData";

function App() {
    const [headerTitle, setHeaderTitle] = useState("Dashboard");
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setHeaderTitle("Dashboard");
                break;
            case "/sensors":
                setHeaderTitle("Sensors");
                break;
            case "/sensor-data":
                setHeaderTitle("Sensor Data");
                break;
            case "/settings":
                setHeaderTitle("Settings");
                break;
            default:
                setHeaderTitle("");
        }
    }, [location]);

    return (
        <div className="App">
            <Sidebar/>
            <Header title={headerTitle}/>
            <Routes>
                <Route exact path="/" element={<Dashboard/>}/>
                <Route path="/sensors" element={<Sensors/>}/>
                <Route path="/sensor-data" element={<SensorData/>}/>
                <Route path="/settings" element={<Home/>}/>
                <Route path="/*" element={<NotFound/>}/>
                <Route path="*" element={<Navigate replace to="/"/>}>
                </Route>
            </Routes>
        </div>
    );
}


function Home() {
    return (
        <div>
            asfd
        </div>
    );
}

export default App;
