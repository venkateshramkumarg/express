import { useAuth } from '../hooks/useAuth.jsx'

export default function Feed() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-3">
          Welcome, <span className="text-rose-400">{user?.firstName}</span> 👋
        </h1>
        <p className="text-gray-400 mb-12">
          Connect with developers who share your passion.
        </p>

        {/* Placeholder card — extend this with real user feed data */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-4xl font-bold text-white">
            D
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Demo Developer</h2>
            <p className="text-gray-400 text-sm mt-1">Full-Stack · React · Node.js</p>
            <p className="text-gray-500 text-sm mt-3 max-w-xs mx-auto">
              Passionate about building clean UIs and scalable APIs.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-8 py-3 rounded-full text-sm font-medium transition">
              ✕ Skip
            </button>
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-sm font-medium transition">
              ♥ Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
