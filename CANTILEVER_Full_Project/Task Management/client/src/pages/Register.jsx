import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <form onSubmit={registerUser} className="max-w-md mx-auto mt-20 p-5 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-3 border rounded" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-3 border rounded" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-3 border rounded" />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Register</button>
    </form>
  );
}

export default Register;