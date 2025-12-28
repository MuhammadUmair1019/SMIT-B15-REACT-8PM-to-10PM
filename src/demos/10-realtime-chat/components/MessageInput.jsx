/**
 * MESSAGE INPUT COMPONENT
 * 
 * Handles message creation with:
 * - Real-time message sending
 * - Optimistic UI updates
 * - Enter key to send
 * - Character counter
 * - Loading states
 */

import { useState, useRef, useEffect } from "react";
import { supabase } from "../../../config/supabase";
import { useMutation } from "@tanstack/react-query";

function MessageInput({ user, currentRoom, queryClient }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Create message mutation
  const createMessage = useMutation({
    mutationFn: async (text) => {
      const { data, error } = await supabase.from("messages").insert({
        text: text.trim(),
        user_id: user.id,
        room: currentRoom,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSending) return;

    setIsSending(true);

    // Optimistic update
    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      text: trimmedMessage,
      user_id: user.id,
      room: currentRoom,
      created_at: new Date().toISOString(),
      profiles: {
        username: user.email?.split("@")[0],
        email: user.email,
      },
    };

    queryClient.setQueryData(["messages", currentRoom], (old) => [
      ...(old || []),
      optimisticMessage,
    ]);

    try {
      await createMessage.mutateAsync(trimmedMessage);
    } catch (error) {
      // Remove optimistic update on error
      queryClient.setQueryData(["messages", currentRoom], (old) =>
        old?.filter((msg) => msg.id !== optimisticMessage.id)
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const maxLength = 1000;

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                if (e.target.value.length <= maxLength) {
                  setMessage(e.target.value);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder={`Message #${currentRoom}...`}
              rows={1}
              className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none max-h-32 overflow-y-auto"
              disabled={isSending}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {message.length}/{maxLength}
            </div>
          </div>
          <button
            type="submit"
            disabled={!message.trim() || isSending}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </div>
  );
}

export default MessageInput;

