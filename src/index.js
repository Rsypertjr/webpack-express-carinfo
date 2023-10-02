import React from "react"
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
    
function component(){
    const element = document.createElement('div');

    element.setAttribute('id','app');

    return element;
}

document.body.appendChild(component());

const container = document.getElementById('app');

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>   
   </React.StrictMode>
);