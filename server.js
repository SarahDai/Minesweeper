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

io.on("connection", client => {
    // Send messages to and receive messages from the client in here
    
    client.emit("hello", "hello client");
    client.emit("client id", client.id);

    client.on("join", username => {
        client.emit("set connected");
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
    })


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