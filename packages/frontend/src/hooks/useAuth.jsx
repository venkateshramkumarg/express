import { useState, useEffect, createContext, useContext } from 'react'
import api from '../lib/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/profile')
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password })
    setUser(res.data.user)
    return res.data
  }

  const signup = async (data) => {
    const res = await api.post('/signup', data)
    setUser(res.data.user)
    return res.data
  }

  const logout = async () => {
    await api.post('/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
