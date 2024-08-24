import React, { useState, useEffect } from "react";
import { RiRobot3Fill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";

const Chatbot = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatWindow = () => {
    setChatOpen(!isChatOpen);
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/history");
      const data = await response.json();
      if (data.history) {
        setMessages(data.history);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "" || isLoading) return;

    const userMessage = { role: "user", content: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, stream: true }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let responseText = "";

      const modelMessage = { role: "model", content: "" };
      setMessages((prevMessages) => [...prevMessages, modelMessage]);

      // Stream the response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        responseText += decoder.decode(value, { stream: true });

        // Update the latest model message
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = {
            ...modelMessage,
            content: responseText,
          };
          return updatedMessages;
        });
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed bottom-10 right-10 z-50">
        <RiRobot3Fill
          className="text-slate-300 text-5xl hover:text-white hover:cursor-pointer"
          onClick={toggleChatWindow}
        />
      </div>

      {isChatOpen && (
        <div className="fixed bottom-0 right-0 z-50 bg-white shadow-lg p-4 w-full h-full md:w-full md:h-full lg:w-1/2 lg:h-full flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Chat with us</h2>
            <button
              onClick={toggleChatWindow}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoIosCloseCircle className="text-3xl" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto mb-2">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg mb-2 text-sm ${
                    msg.role === "user" ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No messages yet.</p>
            )}
          </div>
          <div className="mt-2 flex items-center">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={
                isLoading ? "Generating response..." : "Enter your message"
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
              onClick={handleSendMessage}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
