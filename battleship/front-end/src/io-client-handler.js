import { io } from "socket.io-client";
export const socket = io("https://battleship-isg1.onrender.com", { transports: ['websocket'], upgrade: false });
