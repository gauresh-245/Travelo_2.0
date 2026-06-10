import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";

import CreateTrip from "./components/CreateTrip";
import HotelSearch from "./components/HotelSearch";
import HotelDetails from "./components/HotelDetails";
import Background from "./components/Background/Background";
import Main from "./components/Main/Main";
import Layout from "./components/Layout/Layout";
import DestinationPage from "./components/Destination/DestinationPage";
import Login from "./components/Navbar/Login";
import Register from "./components/Navbar/Register";

import "./App.css";
import Packages from "./components/Packages/Packages";
import MyTrips from "./components/Navbar/MyTrips";
import ProtectedRoute from "./components/ProtectedRoute";
import TransportPage from "./components/Navbar/TransportPage";
import HomeFeatures from "./components/Home/HomeFeatures";
import Testimonials from "./components/Home/Testimonials";
import StatsCounter from "./components/Home/StatsCounter";
import Footer from "./components/Footer/Footer";
import AdminDashboard from "./components/Admin/AdminDashboard";



function App() {
  const MainData = [
    { text1: "Dive into", text2: "what you love" },
    { text1: "Indulge", text2: "your passions" },
    { text1: "Given to", text2: "your passions" },
  ];

  const [dataCount, setDataCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);
  const internalRef = useRef(null);

  useEffect(() => {
    if (!playStatus) {
      internalRef.current = setInterval(() => {
        setDataCount((count) => (count === 2 ? 0 : count + 1));
      }, 3000);
    } else {
      clearInterval(internalRef.current);
    }

    return () => clearInterval(internalRef.current);
  }, [playStatus]);

  return (
    <div className="App">
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <div className="home-container">
                <Background playStatus={playStatus} dataCount={dataCount} />
                <Layout>
                  <Main
                    playStatus={playStatus}
                    setPlayStatus={setPlayStatus}
                    MainData={MainData[dataCount]}
                    dataCount={dataCount}
                    setDataCount={setDataCount}
                  />
                </Layout>
              </div>
              <HomeFeatures />
              <StatsCounter />
              <Testimonials />
              <Footer />
            </>
          }
        />
        {/* OTHER ROUTES */}
        <Route
          path="/create-trip"
          element={
            <Layout>
              <CreateTrip />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/hotel-search"
          element={
            <Layout>
              <HotelSearch />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/hotel-details"
          element={
            <Layout>
              <HotelDetails />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/explore"
          element={
            <Layout>
              <Packages />
              <Footer />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/mytrips"
          element={
            <ProtectedRoute>
              <MyTrips />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transports"
          element={
            <Layout>
              <TransportPage />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />



        <Route path="/destination/:slug" element={<DestinationPage />} />
      </Routes>
    </div>
  );
}

export default App;