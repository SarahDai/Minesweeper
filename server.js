/** SERVER CONFIGURATION */
const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require("path");
const { isPrimitive } = require("util");

// Choose a port, default is 4002 (could be almost anything)
const PORT = process.env.PORT || 4002;

// When on Heroku, serve the UI from the build folder
if (process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'build')));  
    app.get('*', (req, res) => {    
        res.sendfile(path.join(__dirname = 'build/index.html'));  
    })
}

// When on local host, server from the public folder. 
// Rule will not be written if production conditional has executed
app.get('*', (req, res) => {  
    app.sendFile(path.join(__dirname+'public/index.html'));
})

// Listen for client connections
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

let messages = [];
let clients = {};
let boards = [];
let pair_book = {};
let board_pair = {};
let mines_pair = {};
let client_list = [];

io.on("connection", client => {
    // Send messages to and receive messages from the client in here
    if (!client_list.includes(client.id)) {
        client_list.push(client.id);
    }

    client.emit("hello", "hello client");
    client.emit("client id", client.id);

    if (client_list.length > 0 &&
        client_list.length % 2 == 0 &&
        !pair_book[client.id]) {
        const length = client_list.length;
        const p2 = client_list[length - 2];
        const p1 = client_list[length - 1];
        pair_book[p2] = p1;
        pair_book[p1] = p2;    
        client.emit("set pair up", p1, p2);
        io.to(p2).emit("set pair up", p1, p2);
        client.emit("get init board", p1);
    }

    client.on("update pair board", board => {
        console.log("update board");
        const p1 = client.id;
        const p2 = pair_book[p1];
        board_pair[p1] = board;
        board_pair[p2] = board;
        client.emit("set pair board", board);
        io.to(p2).emit("set pair board", board);
    });

    client.on("update pair mines", mines => {
        console.log("update mines");
        const p1 = client.id;
        const p2 = pair_book[p1];
        mines_pair[p1] = mines;
        mines_pair[p2] = mines;
        client.emit("set pair mines", mines);
        io.to(p2).emit("set pair mines", mines);
    });

    client.on("update pair status", status => {
        console.log("update pair status");
        const p1 = client.id;
        const p2 = pair_book[p1];
        io.to(p2).emit("set pair status", status);
    });

    client.on("join", username => {
        io.sockets.emit("set connected");
        clients[client.id] = username;
        messages.push(username + " has joined the chat");
        io.sockets.emit("all messages", messages);
    });

    client.on("new message", msg => {
        messages.push(clients[client.id] + ": " + msg)
        io.sockets.emit("all messages", messages);
    });

    client.on("disconnect", () => {
        if (clients.hasOwnProperty(client.id)) {
            const username = clients[client.id];
            messages.push(username + " has left the chat");
            io.sockets.emit("all messages", messages);
        }
    });

    /**
     * // Send to this client only
     * client.emit("message name", content)
     * 
     * // Send to all connected clients
     * io.sockets.emit("message name", content)
     * 
     * // Listen for a message from a client
     * client.on("message name", (dataFromClient) => { 
     *  //do something
     * })
     */
})