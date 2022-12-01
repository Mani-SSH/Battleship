import { io } from "socket.io-client";

const URL = (process.env.NODE_ENV === "production")? process.env.REACT_APP_DEVELOPMENT_URL : process.env.REACT_APP_LOCAL_URL;
export const socket = io(URL);
