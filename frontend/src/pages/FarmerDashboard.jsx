import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function FarmerDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    location: "",
    description: "",
    contactNumber: "",
    image: "",
  });

  const [myCrops, setMyCrops] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) navigate("/login");
    fetchMyCrops();
    fetchOrders();
  }, []);

  const fetchMyCrops = async () => {
    const res = await api.get("/crops/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMyCrops(res.data);
  };

  const fetchOrders = async () => {
    const res = await api.get("/orders/farmer", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    await api.post("/crops", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({
      name: "",
      category: "",
      quantity: "",
      price: "",
      location: "",
      description: "",
      contactNumber: "",
      image: "",
    });
    fetchMyCrops();
  };

  const updateOrderStatus = async (id, status) => {
    await api.put(
      `/orders/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchOrders();
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

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-white border-b">
        <h1 className="text-2xl font-bold text-green-700">
          🚜 Farmer Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* ADD CROP */}
      <div className="max-w-xl mx-auto bg-white p-6 mt-8 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-green-700 mb-5">
          🌱 Add New Crop
        </h2>

        {["name","category","quantity","price","location","contactNumber"].map((f) => (
          <input
            key={f}
            name={f}
            placeholder={f.toUpperCase()}
            value={form[f]}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-1 focus:ring-green-400"
          />
        ))}

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <input type="file" onChange={handleImageUpload} />

        {form.image && (
          <img
            src={form.image}
            className="mt-3 h-40 w-full object-cover rounded"
          />
        )}

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Crop
        </button>
      </div>

      {/* ORDERS */}
      <div className="max-w-5xl mx-auto mt-12 px-4">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          📦 Incoming Orders
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between">
                <h3 className="font-semibold">{o.crop.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${statusColor(
                    o.status
                  )}`}
                >
                  {o.status.toUpperCase()}
                </span>
              </div>

              <p className="text-sm mt-2">Buyer: {o.buyer.name}</p>
              <p className="text-sm">Qty: {o.quantity} kg</p>
              <p className="text-sm">₹ {o.totalPrice}</p>

              <div className="mt-3 flex gap-2">
                {o.status === "placed" && (
                  <button
                    onClick={() =>
                      updateOrderStatus(o._id, "accepted")
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Accept
                  </button>
                )}
                {o.status === "accepted" && (
                  <button
                    onClick={() =>
                      updateOrderStatus(o._id, "delivered")
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MY CROPS */}
      <div className="max-w-5xl mx-auto mt-12 px-4 pb-10">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          🌾 My Crops
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {myCrops.map((c) => (
            <div
              key={c._id}
              className="bg-white p-4 rounded-lg border hover:shadow-sm transition"
            >
              {c.image && (
                <img
                  src={c.image}
                  className="h-32 w-full object-cover rounded mb-2"
                />
              )}
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-sm">{c.category}</p>
              <p className="text-sm">
                ₹ {c.price} / kg • {c.quantity} kg
              </p>
              <p className="text-sm">📞 {c.contactNumber}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;

 