import store from "./redux/store";
import {newMessage, setConnected} from "./redux/actions";


/** CLIENT CONFIGURATION - connect to the server */
const socketIOClient = require("socket.io-client");

// When deployed, connect to the hosted server, otherwise connect to local server
// Localhost port must match server
let host = process.env.NODE_ENV === 'production' ?
    "appname.herokuapp.com" : "localhost:4002"   
let socket = socketIOClient.connect(host, {secure: true});
// Checks which host we're connected to (for troubleshooting);
console.log("connected to " + host);

socket.on("hello", msg => {
    console.log("server said: " + msg);
});

socket.on("all messages", msg => {
    store.dispatch(newMessage(msg));
});

socket.on("set connected", () => {
    store.dispatch(setConnected());
})

export const joinChat = username => {
    socket.emit("join", username);
};

export const newMsg = msg => {
    socket.emit("new message", msg);
};

/**
 * Send and receive messages
 * 
 * // Emit a message and wait for a reponse. Call this in an async action.
 * export const myFunction = callbackFunc => {
 *    socket.emit("message for the server", data);
 *    
 *    socket.on("message from the server", result => {
 *       callbackFunc(result);
 *    })
 * 
 * }
 * 
 * // Listen for a particular message
 * socket.on("message received", msg => {
 *    //do something
 * })
 */


