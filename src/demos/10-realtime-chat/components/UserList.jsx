/**
 * USER LIST COMPONENT
 * 
 * Displays online users with:
 * - Real-time presence updates
 * - User avatars
 * - Online indicators
 */

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../config/supabase";

function UserList({ onlineUsers, currentUserId }) {
  // Fetch profiles for online users
  const { data: profiles } = useQuery({
    queryKey: ["online-profiles", onlineUsers],
    queryFn: async () => {
      if (!onlineUsers.length) return [];
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .in("id", onlineUsers);

      if (error) throw error;
      return data || [];
    },
    enabled: onlineUsers.length > 0,
  });

  if (!onlineUsers.length) {
    return (
      <div className="flex-1 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Online Users</h3>
        <p className="text-xs text-gray-500">No users online</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Online Users ({onlineUsers.length})
      </h3>
      <div className="space-y-2">
        {profiles?.map((profile) => {
          const isCurrentUser = profile.id === currentUserId;
          return (
            <div
              key={profile.id}
              className={`flex items-center gap-2 p-2 rounded-lg ${
                isCurrentUser ? "bg-indigo-50" : "hover:bg-gray-100"
              }`}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
                  {profile.username?.[0]?.toUpperCase() ||
                    profile.email?.[0]?.toUpperCase() ||
                    "?"}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {profile.username || profile.email?.split("@")[0] || "User"}
                  {isCurrentUser && (
                    <span className="text-xs text-indigo-600 ml-1">(You)</span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserList;

