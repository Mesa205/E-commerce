import axios from "axios";
import React from "react";
import { View } from "react-native";
import Navigation from "./src/navigation/Navigation"

axios.defaults.baseURL="http://192.168.1.2:4000"


export default function App() {
  return (
    
    <Navigation/>
    
  );
}

