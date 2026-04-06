import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <Link to="/" className="text-2xl font-bold text-rose-400 tracking-tight">
        DevTinder
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-300">
              Hey, <span className="font-semibold text-white">{user.firstName}</span>
            </span>
            <Link to="/profile" className="text-sm hover:text-rose-400 transition">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-rose-500 hover:bg-rose-600 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm hover:text-rose-400 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-rose-500 hover:bg-rose-600 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
