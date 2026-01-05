
import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../authContext/AuthProvider";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Popup modal state
  const [popup, setPopup] = useState({ open: false, type: null });

  useEffect(() => {
    if (user && user.user) {
      setForm(user.user);
      if (user.user.avatar_url) setAvatarPreview(user.user.avatar_url);
    } else if (user) {
      setForm(user);
      if (user.avatar_url) setAvatarPreview(user.avatar_url);
    }
  }, [user]);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSave = () => {
    // TODO: wire up to real API to save profile and avatar
    console.log("Save profile", form, { avatarFile });
    // Example upload flow (uncomment and adjust endpoint if your API supports it):
    // if (avatarFile) {
    //   const fd = new FormData();
    //   fd.append('avatar', avatarFile);
    //   // use fetch or axios to post to your upload endpoint
    //   fetch(`${import.meta.env.VITE_API_URL}/profile/avatar`, { method: 'POST', body: fd, credentials: 'include' })
    //     .then(r => r.json())
    //     .then(data => console.log('uploaded', data))
    //     .catch(err => console.error(err));
    // }
    setEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    // optionally make API call to remove avatar from server
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="w-300 mx-auto px-6 py-12">
      <div className="bg-white mt-10 rounded-xl shadow p-6">
        <h3 className="text-xl font-bold text-green-700 mb-4 border-b pb-2">Personal Details</h3>
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28 rounded-full bg-green-100 overflow-hidden flex items-center justify-center text-3xl font-bold text-green-600">
            {avatarPreview ? (
              <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-green-600">
                {form.full_name ? form.full_name.split(" ").map(n => n[0]).slice(0,2).join("") : "U"}
              </span>
            )}

            {/* Overlay single remove control when an avatar is present */}
            {avatarPreview && (
              <button>
                
              </button>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{form.name || form.full_name || "User"}</h2>
            <p className="text-sm text-gray-600">{form.email || "No email provided"}</p>
            <p className="text-sm text-gray-600 mt-1">{form.contact || form.phone || "No phone"}</p>
          </div>

          <div className="flex items-center gap-3">
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-full font-medium shadow-sm transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              {avatarPreview ? "Change Image" : "Add Image"}
            </button>

            <button
              onClick={() => setEditing((s) => !s)}
              className={`flex items-center gap-2 px-4 py-2 ${editing ? 'bg-gray-200 text-gray-700' : 'bg-green-600 text-white hover:bg-green-700'} rounded-full font-medium shadow-sm transition`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6.586-6.586a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-2.828 0L9 13V11z" /></svg>
              {editing ? "Cancel" : "Edit Profile"}
            </button>
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-full font-medium shadow-sm transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
              Logout
            </button>
          </div>
        </div>

        <div className="mt-6">
          {editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">Full name</label>
                <input name="name" value={form.name || ""} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Phone</label>
                <input name="contact" value={form.contact || ""} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Address</label>
                <input name="address" value={form.address || ""} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded" />
              </div>

              <div className="md:col-span-2 flex gap-3 mt-2">
                <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
                <button onClick={() => setEditing(false)} className="px-4 py-2 border rounded">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm text-gray-500">Full name</h4>
                <p className="text-lg text-gray-800 mt-1">{form.name || form.full_name || "—"}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">Email</h4>
                <p className="text-lg text-gray-800 mt-1">{form.email || "—"}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">Phone</h4>
                <p className="text-lg text-gray-800 mt-1">{form.contact || form.phone || "—"}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">Address</h4>
                <p className="text-lg text-gray-800 mt-1">{form.address || "—"}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Investment Calculator Section */}
      <div className="mt-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section: Investment Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-md p-8 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-blue-700 mb-8">Your Investments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="block text-gray-700 font-semibold mb-1">Investment Type</h4>
                <p className="text-lg text-gray-800">{form.investment_type || "—"}</p>
              </div>
              <div>
                <h4 className="block text-gray-700 font-semibold mb-1">Invested amount</h4>
                <p className="text-lg text-gray-800">{form.amount !== undefined ? `₹${form.amount}` : "—"}</p>
              </div>
              <div>
                <h4 className="block text-gray-700 font-semibold mb-1">Duration (Years)</h4>
                <p className="text-lg text-gray-800">{form.duration !== undefined ? form.duration : "—"}</p>
              </div>
              <div>
                <h4 className="block text-gray-700 font-semibold mb-1">Return Rate</h4>
                <p className="text-lg text-gray-800">{form.return_rate !== undefined ? `${form.return_rate}%` : "—"}</p>
              </div>
              <div>
                <h4 className="block text-gray-700 font-semibold mb-1">Profit Amount </h4>
                <p className="text-lg text-gray-800">{form.profit_value !== undefined ? `₹${form.profit_value}` : "—"}</p>
              </div>
              <div>
                <h4 className="block text-gray-700 font-semibold mb-1">Current amount</h4>
                <p className="text-lg text-gray-800">{form.current_amount !== undefined ? `₹${form.current_amount}` : "—"}</p>
              </div>
              <div>
                <h4 className="block text-gray-700 font-semibold mb-1">Currency</h4>
                <p className="text-lg text-gray-800">{form.currency || "—"}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                onClick={() => navigate('/tools/financial-calculators')}
              >
                Financial Calculators
              </button>
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                onClick={() => setPopup({ open: true, type: 'deposit' })}
              >
                Deposit
              </button>
              <button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                onClick={() => setPopup({ open: true, type: 'withdraw' })}
              >
                Withdraw
              </button>
            </div>
          </div>
          {/* Right Section: Profile / Summary */}
          <div className="w-full md:w-96 flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-center overflow-hidden">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-5xl font-bold text-blue-400">
                    {form.full_name
                      ? form.full_name.split(' ').map(n => n[0]).slice(0,2).join("")
                      : form.name
                        ? form.name.split(' ').map(n => n[0]).slice(0,2).join("")
                        : "U"}
                  </span>
                )}
              </div>
              <div className="w-full bg-gray-50 rounded-xl p-4 shadow-inner">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Summary</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>Investment Type: <span className="font-medium">{form.investment_type || "—"}</span></li>
                  <li>Invested amount: <span className="font-medium">{form.amount !== undefined ? `₹${form.amount}` : "—"}</span></li>
                  <li>Duration: <span className="font-medium">{form.duration !== undefined ? form.duration : "—"}</span></li>
                  <li>Return Rate: <span className="font-medium">{form.return_rate !== undefined ? `${form.return_rate}%` : "—"}</span></li>
                  <li>Profit Amount : <span className="font-medium">{form.profit_value !== undefined ? `₹${form.profit_value}` : "—"}</span></li>
                  <li>Current amount: <span className="font-medium">{form.current_amount !== undefined ? `₹${form.current_amount}` : "—"}</span></li>
                  <li>Currency: <span className="font-medium">{form.currency || "—"}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {popup.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background: 'none'}}>
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xs w-full flex flex-col items-center relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setPopup({ open: false, type: null })}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="mb-4">
              <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${popup.type === 'deposit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{popup.type === 'deposit' ? 'Deposit' : 'Withdraw'}</span>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Feature Coming Soon</h2>
              <p className="text-gray-600">This feature will be available in a future update.</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-gray-100 text-center py-4 mt-12 border-t text-gray-500 text-sm">
        Thanks For Chosing us !
      </footer>
    </div>
  );
}

export default Profile;