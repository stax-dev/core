import React from "react";
import "./App.css";
import { Route, Outlet, Routes } from "react-router-dom";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Index


//Landing
import PreLaunch from "./pages/landing/prelaunch/PreLaunch";


// Not Found
import E404 from "./pages/errors/E404";


// const electron = window.require('electron');
// const remote = electron.remote;  // remote is a module that is available to the renderer process
// const {BrowserWindow,dialog,Menu} = remote;  // BrowserWindow is a class that is available to the renderer process

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCnS-4wYLmVeUpGJdaciwAJrJxFtiQTaE8",
    authDomain: "stax-devio.firebaseapp.com",
    projectId: "stax-devio",
    storageBucket: "stax-devio.appspot.com",
    messagingSenderId: "558825629645",
    appId: "1:558825629645:web:5a62a18b4b812627cf0684",
    measurementId: "G-CNRKCH57E6",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  var websiteVersion = "prelaunch"
  //prelaunch or main website version

  if(websiteVersion === "prelaunch"){
    return (
      <Routes>
      <Route path="/" element={<Outlet />}>

        {/* Landing */}
        <Route index element={<PreLaunch />}/>

        {/* Other */}
        <Route path="*" element={<E404 />} />
      </Route>
    </Routes>
    )
  }else if(websiteVersion === "main"){
   
  };
}

export default App;
