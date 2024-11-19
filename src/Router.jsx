import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import './index.css'
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";



export const router = createBrowserRouter ([
    
    {
        path:'/',
        element: <App/>
    },
     {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    }
  
        
   


])