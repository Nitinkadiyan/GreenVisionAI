import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

const SOCKET_URL = "http://localhost:5001";

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let currentSocket = null;

    const connectSocket = () => {
      const token = localStorage.getItem("token");

      // No token means no authenticated socket connection.
      if (!token) {
        if (currentSocket) {
          currentSocket.disconnect();
          currentSocket = null;
        }

        setSocket(null);
        setConnected(false);
        return;
      }

      // Avoid creating duplicate connections.
      if (currentSocket) return;

      currentSocket = io(SOCKET_URL, {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      currentSocket.on("connect", () => {
        console.log("Socket connected:", currentSocket.id);
        setConnected(true);
      });

      currentSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        setConnected(false);
      });

      currentSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
        setConnected(false);
      });

      setSocket(currentSocket);
    };

    const disconnectSocket = () => {
      if (currentSocket) {
        currentSocket.disconnect();
        currentSocket = null;
      }

      setSocket(null);
      setConnected(false);
    };

    // Listen for authentication changes in this browser tab.
    window.addEventListener("auth:changed", connectSocket);

    // Listen for localStorage changes from another browser tab.
    window.addEventListener("storage", connectSocket);

    // Check whether a user is already logged in.
    connectSocket();

    return () => {
      window.removeEventListener("auth:changed", connectSocket);
      window.removeEventListener("storage", connectSocket);

      disconnectSocket();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used inside SocketProvider");
  }

  return context;
}