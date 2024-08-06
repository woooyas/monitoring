import './App.css';
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import {Routes, Route, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

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
            case "/notifications":
                setHeaderTitle("Notifications");
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
                    <Route path="/sensors" element={<Home/>}/>
                    <Route path="/notifications" element={<Home/>}/>
                    <Route path="/settings" element={<Home/>}/>
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
