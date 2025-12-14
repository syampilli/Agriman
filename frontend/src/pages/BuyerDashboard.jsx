import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function BuyerDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [crops, setCrops] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!token) navigate("/login");
    fetchCrops();
    fetchOrders();
  }, []);

  const fetchCrops = async () => {
    const res = await api.get("/crops");
    setCrops(res.data);
  };

  const fetchOrders = async () => {
    const res = await api.get("/orders/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data);
  };

  const placeOrder = async (cropId, quantity) => {
    try {
      await api.post(
        "/orders",
        { cropId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order placed successfully 🌾");
      fetchOrders();
    } catch {
      toast.error("Order failed ❌");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const statusColor = (status) => {
    if (status === "placed") return "bg-yellow-100 text-yellow-700";
    if (status === "accepted") return "bg-blue-100 text-blue-700";
    return "bg-green-100 text-green-700";
  };

  const filteredCrops = crops.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-white border-b">
        <h1 className="text-2xl font-bold text-green-700">
          🌾 Buyer Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <input
          type="text"
          placeholder="Search crops..."
          className="w-full md:w-1/3 p-2 border rounded focus:ring-1 focus:ring-green-400"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CROPS */}
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <CropCard
            key={crop._id}
            crop={crop}
            placeOrder={placeOrder}
          />
        ))}
      </div>

      {/* MY ORDERS */}
      <div className="max-w-6xl mx-auto px-4 mt-10 pb-10">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          📦 My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {orders.map((o) => (
              <div
                key={o._id}
                className="bg-white p-4 rounded-lg border"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    {o.crop.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${statusColor(
                      o.status
                    )}`}
                  >
                    {o.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm mt-2">
                  Quantity: {o.quantity} kg
                </p>
                <p className="text-sm">
                  Total: ₹ {o.totalPrice}
                </p>
                <p className="text-xs text-gray-500">
                  Order ID: {o._id.slice(-6)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CropCard({ crop, placeOrder }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-white rounded-lg border p-4 hover:shadow-sm transition">
      {crop.image && (
        <img
          src={crop.image}
          alt={crop.name}
          className="h-40 w-full object-cover rounded mb-3"
        />
      )}

      <h3 className="font-semibold text-lg">{crop.name}</h3>
      <p className="text-sm text-gray-500">{crop.location}</p>

      <p className="mt-2 font-semibold text-green-700">
        ₹ {crop.price} / kg
      </p>

      <p className="text-sm mt-1">
        📞 Farmer: {crop.contactNumber}
      </p>

      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="w-full border rounded p-2 mt-3"
      />

      <p className="text-sm mt-2">
        Total: ₹ {qty * crop.price}
      </p>

      <button
        onClick={() => placeOrder(crop._id, qty)}
        className="w-full mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Buy Now
      </button>
    </div>
  );
}

export default BuyerDashboard;
