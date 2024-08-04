import { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Cars from "./components/Cars/Cars";
import CarDetails from "./components/Details/CarDetails";
import CarBrands from "./components/CarBrands/CarBrands";
import { CarsContext } from "./context/carsContext";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import CreateCars from "./components/CreateCars/CreateCars";
function App() {
  const [cars, setCars] = useState([]);
  const [carsFilterValue, setCarsFilterValue] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const contextObject = {
    cars,
    setCars,
    carsFilterValue,
    setCarsFilterValue,
    accessToken,
    setAccessToken,
  };

  function ProtectedRoute({ children }) {
    if (!accessToken) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }

  return (
    <>
      <CarsContext.Provider value={contextObject}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CarBrands />
                <Cars />
              </>
            }
          />
          <Route path="/:brand" element={<CarDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateCars />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CarsContext.Provider>
    </>
  );
}

export default App;