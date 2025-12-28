/**
 * REAL-TIME CHAT APPLICATION
 * 
 * This is a complete end-to-end chat application demonstrating:
 * - Real-time messaging with Supabase
 * - User authentication
 * - Online/offline status
 * - Message history
 * - Optimistic UI updates
 * - Error handling
 * - Responsive design
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import UserList from "./components/UserList";
import ChatHeader from "./components/ChatHeader";

function ChatApp({ user }) {
  const [currentRoom, setCurrentRoom] = useState("general");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch messages for current room
  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", currentRoom],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*, profiles:user_id(*)")
        .eq("room", currentRoom)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    enabled: !!user,
  });

  // Set up real-time subscription for messages
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`room:${currentRoom}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room=eq.${currentRoom}`,
        },
        (payload) => {
          // Fetch user profile for new message
          supabase
            .from("profiles")
            .select("*")
            .eq("id", payload.new.user_id)
            .single()
            .then(({ data }) => {
              const newMessage = {
                ...payload.new,
                profiles: data,
              };
              queryClient.setQueryData(["messages", currentRoom], (old) => [
                ...(old || []),
                newMessage,
              ]);
            });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `room=eq.${currentRoom}`,
        },
        (payload) => {
          queryClient.setQueryData(["messages", currentRoom], (old) =>
            old?.map((msg) =>
              msg.id === payload.new.id ? { ...msg, ...payload.new } : msg
            )
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "messages",
          filter: `room=eq.${currentRoom}`,
        },
        (payload) => {
          queryClient.setQueryData(["messages", currentRoom], (old) =>
            old?.filter((msg) => msg.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentRoom, user, queryClient]);

  // Set up presence for online users
  useEffect(() => {
    if (!user) return;

    const presenceChannel = supabase.channel("online-users", {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    presenceChannel
      .on("presence", { event: "sync" }, () => {
        const state = presenceChannel.presenceState();
        const userIds = Object.keys(state);
        setOnlineUsers(userIds);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        setOnlineUsers((prev) => [...new Set([...prev, key])]);
      })
      .on("presence", { event: "leave" }, ({ key }) => {
        setOnlineUsers((prev) => prev.filter((id) => id !== key));
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await presenceChannel.track({
            user_id: user.id,
            username: profile?.username || user.email?.split("@")[0],
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      presenceChannel.unsubscribe();
    };
  }, [user, profile]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Create or update user profile
  useEffect(() => {
    if (!user || profile) return;

    const createProfile = async () => {
      const username = user.email?.split("@")[0] || `user_${user.id.slice(0, 8)}`;
      await supabase.from("profiles").upsert({
        id: user.id,
        username,
        avatar_url: null,
        created_at: new Date().toISOString(),
      });
      queryClient.invalidateQueries(["profile", user.id]);
    };

    createProfile();
  }, [user, profile, queryClient]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const rooms = ["general", "random", "help", "tech"];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <ChatHeader
          user={user}
          profile={profile}
          onLogout={handleLogout}
        />

        {/* Room Selection */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Rooms</h3>
          <div className="space-y-1">
            {rooms.map((room) => (
              <button
                key={room}
                onClick={() => setCurrentRoom(room)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                  currentRoom === room
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                # {room}
              </button>
            ))}
          </div>
        </div>

        {/* Online Users */}
        <UserList onlineUsers={onlineUsers} currentUserId={user?.id} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Room Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">
            # {currentRoom}
          </h2>
          <p className="text-sm text-gray-500">
            {messages?.length || 0} messages
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <MessageList
            messages={messages || []}
            currentUserId={user?.id}
            messagesEndRef={messagesEndRef}
          />
        </div>

        {/* Message Input */}
        <MessageInput
          user={user}
          currentRoom={currentRoom}
          queryClient={queryClient}
        />
      </div>
    </div>
  );
}

export default ChatApp;

