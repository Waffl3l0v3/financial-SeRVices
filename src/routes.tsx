import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Resources from "./components/resources";
import Login from "./components/login";
import Signup from "./components/signup";
import StockData from "./components/stockdata";
import Chatbot from "./components/chatbot";

interface RoutesProps {
  onLogin: (userData: any) => void;
}

const RoutesComponent: React.FC<RoutesProps> = ({ onLogin }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stockdata" element={<StockData />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default RoutesComponent;
