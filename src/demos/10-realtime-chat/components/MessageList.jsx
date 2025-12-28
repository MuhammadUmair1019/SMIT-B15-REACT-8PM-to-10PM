/**
 * MESSAGE LIST COMPONENT
 * 
 * Displays all messages in the chat with:
 * - User avatars
 * - Timestamps
 * - Message grouping (same user, consecutive messages)
 * - Scroll to bottom functionality
 */

import { format, isToday, isYesterday, parseISO } from "date-fns";

function MessageList({ messages, currentUserId, messagesEndRef }) {
  const formatTime = (dateString) => {
    const date = parseISO(dateString);
    if (isToday(date)) {
      return format(date, "HH:mm");
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, "HH:mm")}`;
    } else {
      return format(date, "MMM d, HH:mm");
    }
  };

  const shouldShowAvatar = (currentMsg, prevMsg) => {
    if (!prevMsg) return true;
    return (
      currentMsg.user_id !== prevMsg.user_id ||
      new Date(currentMsg.created_at) - new Date(prevMsg.created_at) > 300000 // 5 minutes
    );
  };

  const shouldShowName = (currentMsg, prevMsg) => {
    if (!prevMsg) return true;
    return currentMsg.user_id !== prevMsg.user_id;
  };

  if (!messages || messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-gray-500 text-lg">No messages yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Be the first to say something!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const showAvatar = shouldShowAvatar(message, prevMessage);
          const showName = shouldShowName(message, prevMessage);
          const isOwnMessage = message.user_id === currentUserId;

          return (
            <div
              key={message.id}
              className={`flex gap-3 group hover:bg-gray-100/50 rounded-lg p-2 -mx-2 transition ${
                isOwnMessage ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                {showAvatar ? (
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                    {message.profiles?.username?.[0]?.toUpperCase() ||
                      message.profiles?.email?.[0]?.toUpperCase() ||
                      "?"}
                  </div>
                ) : (
                  <div className="w-10"></div>
                )}
              </div>

              {/* Message Content */}
              <div
                className={`flex-1 ${isOwnMessage ? "items-end" : "items-start"} flex flex-col`}
              >
                {/* Username and Time */}
                {showName && (
                  <div
                    className={`flex items-baseline gap-2 mb-1 ${
                      isOwnMessage ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="font-semibold text-gray-800 text-sm">
                      {message.profiles?.username ||
                        message.profiles?.email?.split("@")[0] ||
                        "Anonymous"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(message.created_at)}
                    </span>
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`inline-block max-w-md px-4 py-2 rounded-2xl ${
                    isOwnMessage
                      ? "bg-indigo-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                </div>

                {/* Edit indicator */}
                {message.edited && (
                  <span className="text-xs text-gray-400 mt-1 italic">
                    (edited)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;

