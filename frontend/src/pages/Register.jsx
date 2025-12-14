import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, email, password, role } = form;

    // 🔒 Frontend validation
    if (!name || !email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-green-700 text-center">
          Register
        </h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full mt-3 p-2 border rounded"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mt-3 p-2 border rounded"
          value={form.email}
          onChange={handleChange}
        />

        <div className="relative mt-3">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={form.password}
            onChange={handleChange}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-green-600"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <select
          name="role"
          className="w-full mt-3 p-2 border rounded"
          value={form.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="buyer">Buyer</option>
          <option value="farmer">Farmer</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
