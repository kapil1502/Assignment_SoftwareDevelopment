const WebSocket = require("ws");

let wss;

const initializeWebSocket = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("close", () => console.log("Client disconnected"));
  });
};

const broadcast = (data) => {
  if (!wss) {
    console.error("WebSocket server not initialized.");
    return;
  }
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

module.exports = {
  initializeWebSocket,
  broadcast,
};