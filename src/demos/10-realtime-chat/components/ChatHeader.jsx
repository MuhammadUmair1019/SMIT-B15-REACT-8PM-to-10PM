/**
 * CHAT HEADER COMPONENT
 * 
 * Displays user information and logout button
 */

function ChatHeader({ user, profile, onLogout }) {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-lg">
            {profile?.username?.[0]?.toUpperCase() ||
              user?.email?.[0]?.toUpperCase() ||
              "?"}
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {profile?.username || user?.email?.split("@")[0] || "User"}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          title="Logout"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
      <div className="text-xs text-green-600 font-medium flex items-center gap-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        Online
      </div>
    </div>
  );
}

export default ChatHeader;

