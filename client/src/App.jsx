//App.jsx
import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Home";


export default function App() {
  return (
<>
<Router>
<Routes>
  <Route path="/" exact  element={<Home />} />
</Routes>
</Router>
</>
  );
}



