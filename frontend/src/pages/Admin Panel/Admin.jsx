import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../authContext/AuthProvider'
import AdminLogin from './AdminLogin'

function Admin() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        // adjust endpoint if your backend exposes a different route
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'
        const res = await axios.get(`${API_BASE}/users/`)
        setUsers(res.data || [])
      } catch (err) {
        console.error('Failed to fetch users', err)
        setError('Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const { user: currentUser, refreshUser } = useContext(AuthContext)

  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState({ username: '', email: '', investment_type: '', amount: '', fd_amount: '', mutual_amount: '', retirement_amount: '', fixed_deposit_amount: '', fund_management_amount: '' })

  const openEdit = (u) => {
    setEditingUser(u)
    setEditForm({
      username: u.username || u.full_name || '',
      email: u.email || '',
      investment_type: u.investment_type || (u.investment && u.investment.type) || '',
      amount: u.amount || (u.investment && u.investment.amount) || '',
      fd_amount: u.fd_amount || (u.investment && u.investment.fd) || '',
      mutual_amount: u.mutual_amount || (u.investment && u.investment.mutual) || '',
      retirement_amount: u.retirement_amount || (u.investment && u.investment.retirement) || '',
      fixed_deposit_amount: u.fixed_deposit_amount || (u.investment && u.investment.fixed_deposit) || '',
      fund_management_amount: u.fund_management_amount || (u.investment && u.investment.fund_management) || ''
    })
  }

  const closeEdit = () => {
    setEditingUser(null)
    setEditForm({ username: '', email: '', investment_type: '', amount: '', fd_amount: '', mutual_amount: '', retirement_amount: '', fixed_deposit_amount: '', fund_management_amount: '' })
  }

  const saveEdit = async () => {
    if (!editingUser) return
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const payload = {
        username: editForm.username,
        email: editForm.email,
        investment_type: editForm.investment_type,
        amount: editForm.amount,
        fd_amount: editForm.fd_amount,
        mutual_amount: editForm.mutual_amount,
        retirement_amount: editForm.retirement_amount,
        fixed_deposit_amount: editForm.fixed_deposit_amount,
        fund_management_amount: editForm.fund_management_amount,
      }
      const res = await axios.patch(`${API_BASE}/users/${editingUser.id}/`, payload)
      const updated = res.data
      setUsers((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      // if admin edited the currently logged in user, refresh auth user
      const editedMatchesCurrent = currentUser && ((updated.id && updated.id === currentUser.id) || (updated.email && updated.email === currentUser.email));
      if (editedMatchesCurrent && refreshUser) {
        await refreshUser()
      }
      closeEdit()
    } catch (err) {
      console.error('Failed to update user', err)
      alert('Update failed')
    }
  }

  return (
    <>
    <AdminLogin/>
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      {loading && <div>Loading users...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="bg-white rounded shadow p-4">
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Investment Type</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Investments</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
                </thead>
                <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">No users found</td>
                </tr>
              )}
              {users.map((u) => (
                <tr key={u.id || u.email} className="border-t">
                  <td className="px-4 py-3">{u.username || u.full_name || '—'}</td>
                  <td className="px-4 py-3">{u.email || '—'}</td>
                  <td className="px-4 py-3">{u.investment_type || u.investment?.type || '—'}</td>
                  <td className="px-4 py-3">{u.amount || u.investment?.amount || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm space-y-1">
                      <div>FD: {u.fd_amount ?? u.investment?.fd ?? '—'}</div>
                      <div>Mutual: {u.mutual_amount ?? u.investment?.mutual ?? '—'}</div>
                      <div>Retirement: {u.retirement_amount ?? u.investment?.retirement ?? '—'}</div>
                      <div>Fixed Deposit: {u.fixed_deposit_amount ?? u.investment?.fixed_deposit ?? '—'}</div>
                      <div>Fund Management: {u.fund_management_amount ?? u.investment?.fund_management ?? '—'}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => openEdit(u)}>Edit</button>
                  </td>
                </tr>
              ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm">Username</label>
                <input className="w-full px-3 py-2 border rounded" value={editForm.username} onChange={(e) => setEditForm(s => ({...s, username: e.target.value}))} />
              </div>
              <div>
                <label className="block text-sm">Email</label>
                <input className="w-full px-3 py-2 border rounded" value={editForm.email} onChange={(e) => setEditForm(s => ({...s, email: e.target.value}))} />
              </div>
              <div>
                <label className="block text-sm">Investment Type</label>
                <input className="w-full px-3 py-2 border rounded" value={editForm.investment_type} onChange={(e) => setEditForm(s => ({...s, investment_type: e.target.value}))} />
              </div>
              <div>
                <label className="block text-sm">Amount</label>
                <input className="w-full px-3 py-2 border rounded" value={editForm.amount} onChange={(e) => setEditForm(s => ({...s, amount: e.target.value}))} />
              </div>

              <div>
                <label className="block text-sm">FD Amount</label>
                <input className="w-full px-3 py-2 border rounded" value={editForm.fd_amount} onChange={(e) => setEditForm(s => ({...s, fd_amount: e.target.value}))} />
              </div>
              <div>
                <label className="block text-sm">Mutual Fund Amount</label>
                <input className="w-full px-3 py-2 border rounded" value={editForm.mutual_amount} onChange={(e) => setEditForm(s => ({...s, mutual_amount: e.target.value}))} />
              </div>
              <div>
                <label className="block text-sm">Retirement Amount</label>
                <input className="w-full px-3 py-2 border rounded" value={editForm.retirement_amount} onChange={(e) => setEditForm(s => ({...s, retirement_amount: e.target.value}))} />
              </div>
              <div>
                <label className="block text-sm">Fixed Deposit Amount</label>
                <input className="w-full px-3 py-2 border rounded" value={editForm.fixed_deposit_amount} onChange={(e) => setEditForm(s => ({...s, fixed_deposit_amount: e.target.value}))} />
              </div>
              <div>
                <label className="block text-sm">Fund Management Amount</label>
                <input className="w-full px-3 py-2 border rounded" value={editForm.fund_management_amount} onChange={(e) => setEditForm(s => ({...s, fund_management_amount: e.target.value}))} />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2 border rounded" onClick={closeEdit}>Cancel</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Add New User</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input placeholder="Username" className="px-3 py-2 border rounded" value={editForm.username} onChange={(e) => setEditForm(s=>({...s, username: e.target.value}))} />
            <input placeholder="Email" className="px-3 py-2 border rounded" value={editForm.email} onChange={(e) => setEditForm(s=>({...s, email: e.target.value}))} />
            <input placeholder="Investment Type" className="px-3 py-2 border rounded" value={editForm.investment_type} onChange={(e) => setEditForm(s=>({...s, investment_type: e.target.value}))} />

            <input placeholder="Amount" className="px-3 py-2 border rounded" value={editForm.amount} onChange={(e) => setEditForm(s=>({...s, amount: e.target.value}))} />
            <input placeholder="FD Amount" className="px-3 py-2 border rounded" value={editForm.fd_amount} onChange={(e) => setEditForm(s=>({...s, fd_amount: e.target.value}))} />
            <input placeholder="Mutual Fund Amount" className="px-3 py-2 border rounded" value={editForm.mutual_amount} onChange={(e) => setEditForm(s=>({...s, mutual_amount: e.target.value}))} />

            <input placeholder="Retirement Amount" className="px-3 py-2 border rounded" value={editForm.retirement_amount} onChange={(e) => setEditForm(s=>({...s, retirement_amount: e.target.value}))} />
            <input placeholder="Fixed Deposit Amount" className="px-3 py-2 border rounded" value={editForm.fixed_deposit_amount} onChange={(e) => setEditForm(s=>({...s, fixed_deposit_amount: e.target.value}))} />
            <input placeholder="Fund Management Amount" className="px-3 py-2 border rounded" value={editForm.fund_management_amount} onChange={(e) => setEditForm(s=>({...s, fund_management_amount: e.target.value}))} />
          </div>

          <div className="mt-3 flex gap-2 justify-end">
            <button className="px-4 py-2 border rounded" onClick={() => setEditForm({ username: '', email: '', investment_type: '', amount: '', fd_amount: '', mutual_amount: '', retirement_amount: '', fixed_deposit_amount: '', fund_management_amount: '' })}>Reset</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={async () => {
              try {
                const API_BASE = import.meta.env.VITE_API_URL || 'https://trustpoint.in/'
                const payload = {
                  username: editForm.username,
                  email: editForm.email,
                  investment_type: editForm.investment_type,
                  amount: editForm.amount,
                  fd_amount: editForm.fd_amount,
                  mutual_amount: editForm.mutual_amount,
                  retirement_amount: editForm.retirement_amount,
                  fixed_deposit_amount: editForm.fixed_deposit_amount,
                  fund_management_amount: editForm.fund_management_amount,
                }
                const res = await axios.post(`${API_BASE}/users/`, payload)
                const newUser = res.data
                setUsers(prev => [newUser, ...prev])
                // reset form
                setEditForm({ username: '', email: '', investment_type: '', amount: '', fd_amount: '', mutual_amount: '', retirement_amount: '', fixed_deposit_amount: '', fund_management_amount: '' })
              } catch (err) {
                console.error('Failed to add user', err)
                alert('Add user failed')
              }
            }}>Add User</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Admin