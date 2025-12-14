import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login successful");

      if (res.data.role === "farmer") {
        navigate("/farmer");
      } else {
        navigate("/buyer");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-green-700 text-center">
          Login
        </h2>

        <input
          name="email"
          placeholder="Email"
          className="w-full mt-4 p-2 border rounded"
          onChange={handleChange}
        />

        <div className="relative mt-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-green-600"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Login
        </button>
        <p
  className="text-sm text-center mt-3 text-green-600 cursor-pointer hover:underline"
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</p>

        <p className="text-sm text-center mt-4">
  Don’t have an account?{" "}
  <span
    onClick={() => navigate("/register")}
    className="text-green-600 cursor-pointer hover:underline"
  >
    Register
  </span>
</p>

      </div>
    </div>
  );
}

export default Login;
