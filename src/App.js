import React from "react";
import {  Route, Routes } from "react-router-dom";
import Display from "./components/display.jsx";


function App() {
    return ( 
        <div>
            <Routes>
                <Route exact path="/" element={<Display />} />
            </Routes>    
        </div>
    )
}

export default App;