import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import api from '../lib/axios'

const GENDER_OPTIONS = ['Male', 'Female', 'Other']

export default function Profile() {
  const { user, login } = useAuth()
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age || '',
    gender: user?.gender || '',
    about: user?.about || '',
  })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const payload = { ...form }
      if (!payload.age) delete payload.age
      if (!payload.gender) delete payload.gender
      await api.patch('/profile', payload)
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-xl mx-auto bg-gray-900 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center text-2xl font-bold text-white">
            {user?.firstName?.[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">First Name</label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-rose-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Last Name</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-rose-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Age</label>
              <input
                type="number"
                min={18}
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-rose-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Gender</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-rose-500 transition"
              >
                <option value="">Select</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">About</label>
            <textarea
              rows={3}
              value={form.about}
              onChange={(e) => setForm({ ...form, about: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-rose-500 transition resize-none"
              placeholder="Tell others about yourself..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
