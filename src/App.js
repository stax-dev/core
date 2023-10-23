import React from "react";
import "./App.css";
import { Route, Outlet, Routes } from "react-router-dom";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Index

// main
import Index from "./pages/index/Index/Index";
import Products from "./pages/index/Products/Products";
import Status from "./pages/index/Status/Status";
import AboutUs from "./pages/index/AboutUs/AboutUs";
import Support from "./pages/index/Support/Support";

// linking
import Login from "./pages/index/Login/Login";
import Register from "./pages/index/Register/Register";
import Checkout from "./pages/index/Checkout/Checkout";

// hosting
import Hosting from "./pages/index/Hosting/Hosting";
import HostDroplet from "./pages/index/HostDroplet/HostDroplet";
import HostTemplates from "./pages/index/HostTemplates/HostTemplates";

// chats
import Chats from "./pages/index/Chats/Chats";

// legal
import Legal from "./pages/index/Legal/Legal";
import LegalTOS from "./pages/index/LegalTOS/LegalTOS";
import LegalPrivacy from "./pages/index/LegalPrivacy/LegalPrivacy";

// Splashboard
import Splashboard from "./pages/splashboard/Splashboard/Splashboard";
import SplashChatrooms from "./pages/splashboard/SplashChatrooms/SplashChatrooms";
import SplashSettings from "./pages/splashboard/SplashSettings/SplashSettings";
import SplashIntegrations from "./pages/splashboard/SplashIntegrations/SplashIntegrations";
import SplashBilling from "./pages/splashboard/SplashBilling/SplashBilling";
import SplashNotifications from "./pages/splashboard/SplashNotifications/SplashNotifications";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard/Dashboard";
import DashFiles from "./pages/dashboard/DashFiles/DashFiles";
import DashConsole from "./pages/dashboard/DashConsole/DashConsole";
import DashAnalytics from "./pages/dashboard/DashAnalytics/DashAnalytics";
import DashChatroom from "./pages/dashboard/DashChatroom/DashChatroom";
import DashHistory from "./pages/dashboard/DashHistory/DashHistory";
import DashAdmin from "./pages/dashboard/DashAdmin/DashAdmin";
import DashBilling from "./pages/dashboard/DashBilling/DashBilling";

// Chessboard
import Chessboard from "./pages/chessboard/Chessboard/Chessboard";
import ChessChatrooms from "./pages/chessboard/ChessChatrooms/ChessChatrooms";
import ChessUsers from "./pages/chessboard/ChessUsers/ChessUsers";
import ChessServers from "./pages/chessboard/ChessServers/ChessServers";
import ChessCorporate from "./pages/chessboard/ChessCorporate/ChessCorporate";
import ChessRepository from "./pages/chessboard/ChessRepository/ChessRepository";
import ChessAdmin from "./pages/chessboard/ChessAdmin/ChessAdmin";

//Landing
import PreLaunch from "./pages/landing/prelaunch/PreLaunch";

//Other
import ChatIndex from "./pages/chat/Index/ChatIndex";
import Chat from "./pages/chat/Chat/Chat";

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
        <Route path="chat" element={<Outlet />}>
          <Route index element={<ChatIndex />} />
          <Route path=":id" element={<Chat />} />
        </Route>
        <Route path="*" element={<E404 />} />
      </Route>
    </Routes>
    )
  }else if(websiteVersion === "main"){
    return (
      <Routes>
        <Route path="/" element={<Outlet />}>

          {/* Index */}
          <Route index element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/status" element={<Status />} />
          <Route path="/support" element={<Support />} />

          {/* Linking */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Hosting */}
          <Route path="/products/hosting" element={<Hosting />} />
          <Route path="/products/hosting/droplet" element={<HostDroplet />} />
          <Route path="/products/hosting/templates" element={<HostTemplates />} />

          {/* Chats */}
          <Route path="/products/chats" element={<Chats />} />

          {/* Legal */}
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/terms-of-service" element={<LegalTOS />} />
          <Route path="/legal/privacy-policy" element={<LegalPrivacy />} />

          {/* Splashboard */}
          <Route path="/splashboard" element={<Splashboard />} />
          <Route path="/splashboard/chatrooms" element={<SplashChatrooms />} />
          <Route path="/splashboard/settings" element={<SplashSettings />} />
          <Route path="/splashboard/integrations" element={<SplashIntegrations />}/>
          <Route path="/splashboard/billing" element={<SplashBilling />} />
          <Route
            path="/splashboard/notifications"
            element={<SplashNotifications />}
          />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/files" element={<DashFiles />} />
          <Route path="/console" element={<DashConsole />} />
          <Route path="/analytics" element={<DashAnalytics />} />
          <Route path="/chatroom" element={<DashChatroom />} />
          <Route path="/history" element={<DashHistory />} />
          <Route path="/admin" element={<DashAdmin />} />
          <Route path="/billing" element={<DashBilling />} />

          {/* Chessboard */}
          <Route path="/chessboard" element={<Chessboard />} />
          <Route path="/chessboard/chatrooms" element={<ChessChatrooms />} />
          <Route path="/chessboard/users" element={<ChessUsers />} />
          <Route path="/chessboard/servers" element={<ChessServers />} />
          <Route path="/chessboard/corporate" element={<ChessCorporate />} />
          <Route path="/chessboard/repository" element={<ChessRepository />} />
          <Route path="/chessboard/admin" element={<ChessAdmin />} />

          {/* Other */}
          <Route path="chat" element={<Outlet />}>
            <Route index element={<ChatIndex />} />
            <Route path=":id" element={<Chat />} />
          </Route>
          <Route path="*" element={<E404 />} />
        </Route>
      </Routes>
    );
  };
}

export default App;
