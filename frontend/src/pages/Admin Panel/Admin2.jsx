import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthProvider";

const Admin2 = () => {
  /* ===============================
     CONFIG
  =============================== */
  const API_BASE = "https://trustpoint.in";

  /* ===============================
     STATE
  =============================== */
  const [activeTab, setActiveTab] = useState("manage");
  const [users, setUsers] = useState([]); // ALWAYS ARRAY
  const [searchTerm, setSearchTerm] = useState("");
  const [investmentFilter, setInvestmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user: currentUser } = useContext(AuthContext) || {};

  /* ===============================
     SAFE HELPERS
  =============================== */
  const safeArray = (v) => (Array.isArray(v) ? v : []);

  /* ===============================
     FETCH USERS (TOKEN-GUARDED)
  =============================== */
  const fetchUsers = async (query = "") => {
    const token = localStorage.getItem("token");
    if (!token) {
      // token abhi nahi aaya — API call hi mat karo
      console.warn("Token not found yet, skipping fetchUsers");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = query
        ? `${API_BASE}/users?q=${encodeURIComponent(query)}`
        : `${API_BASE}/users`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 🔥 FORCE ARRAY ONLY
      setUsers(safeArray(res.data));
    } catch (err) {
      console.error("Failed to fetch users", err);
      setUsers([]);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     EFFECTS
  =============================== */
  // Initial load — token ke bina kuch nahi
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchUsers();
  }, []);

  // Search debounce
  useEffect(() => {
    const t = setTimeout(() => {
      const token = localStorage.getItem("token");
      if (!token) return;

      fetchUsers(searchTerm);
    }, 400);

    return () => clearTimeout(t);
  }, [searchTerm]);

  /* ===============================
     FILTERED USERS (SAFE)
  =============================== */
  let filteredUsers = safeArray(users);

  if (investmentFilter) {
    filteredUsers = filteredUsers.filter(
      (u) =>
        (u.investment_type || "").toLowerCase() ===
        investmentFilter.toLowerCase()
    );
  }

  if (yearFilter) {
    filteredUsers = filteredUsers.filter(
      (u) => String(u.duration || "") === yearFilter
    );
  }

  /* ===============================
     RENDER
  =============================== */
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r shadow-sm">
        <div className="p-6 text-xl font-bold text-blue-600 border-b">
          ADMIN Panel
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab("manage")}
            className={`w-full text-left p-3 rounded ${
              activeTab === "manage"
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            Manage Users
          </button>
          <button
            onClick={() => setActiveTab("registration")}
            className={`w-full text-left p-3 rounded ${
              activeTab === "registration"
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            User Registration
          </button>
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white p-4 shadow-sm flex justify-between">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-64"
            placeholder="Search by name/email"
          />
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* USERS TABLE */}
          {activeTab === "manage" && (
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-bold mb-4">All Users</h2>

              {filteredUsers.length === 0 && !loading && (
                <p className="text-gray-500">No users found</p>
              )}

              {filteredUsers.length > 0 && (
                <table className="w-full table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Investment Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(filteredUsers) &&
                      filteredUsers.map((u) => (
                        <tr key={u._id || u.id} className="border-t">
                          <td className="px-4 py-2">
                            {u.name || u.username || "—"}
                          </td>
                          <td className="px-4 py-2">{u.email || "—"}</td>
                          <td className="px-4 py-2">
                            {u.investment_type || "—"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin2;
