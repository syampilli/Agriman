import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyerDashboard from "./pages/BuyerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/buyer" element={<BuyerDashboard />} />
      <Route path="/farmer" element={<FarmerDashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />


    </Routes>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-700">
          🌾 Agro Marketplace
        </h1>
        <p className="mt-4 text-gray-600">
          Connecting Farmers and Buyers Directly
        </p>
        <a
          href="/login"
          className="inline-block mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}


export default App;
