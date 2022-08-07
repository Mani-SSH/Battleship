import { io } from "socket.io-client";

export const conn = () => {
    const socket = io("http://localhost:5000");
}
