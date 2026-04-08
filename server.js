import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { initSocket } from "./src/sockets/socket.server.js";
import http from "http";
const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);
connectDB();
initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
