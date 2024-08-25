import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Layout from "./Layout.jsx";
import Diseases from "./Components/Diseases/Diseases.jsx";
import Pneumonia from "./Components/Forms/Pneumonia/Pneumonia.jsx";
import Parkinson from "./Components/Forms/Parkinson/Parkinson.jsx"
import SkinCancer from "./Components/Forms/SkinCancer/SkinCancer.jsx";
import HeartDisease from "./Components/Forms/HeartDisease/HeartDisease.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/diseases" element={<Diseases />} />
      <Route path="/pneumonia" element={<Pneumonia />} />
      <Route path="/parkinson" element={<Parkinson />} />
      <Route path="/skin_cancer" element={<SkinCancer />} />
      <Route path="/heart_disease" element={<HeartDisease />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
