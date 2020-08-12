/** SERVER CONFIGURATION */
const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require("path");
const firebase = require("firebase/app");
require("firebase/firestore");
const { isPrimitive } = require("util");

//Initialize firebase 
const firebaseConfig = {
    apiKey: "AIzaSyAItQWqUPCI47I9uoF9t4AjQ3BTyohLkUk",
    authDomain: "final-project-c335d.firebaseapp.com",
    databaseURL: "https://final-project-c335d.firebaseio.com",
    projectId: "final-project-c335d",
    storageBucket: "final-project-c335d.appspot.com",
    messagingSenderId: "497781284991",
    appId: "1:497781284991:web:802ac0c6ef5e64140c1f4a",
    measurementId: "G-BK2GDML896"
 }
 
 firebase.initializeApp(firebaseConfig);

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

const database = firebase.firestore();

const LOGIN_STATE = {
    LOGIN_REQUESTED: "login requested",
    LOGGED_IN: "logged in",
    LOGGED_OUT: "logged out",
    LOGGED_NON_EXIST_USER_FAILURE: "logged non exist user failure",
    LOGGED_INVALID_PASSWORD_FAILURE: "logged invalid password failure",
    NETWORK_ERROR: "network error"
};

const PAGE = {
    LOGIN: "log in",
    SIGN_UP: "sign up",
    INVALID: "invalid",
    LOBBY: "lobby",
    GAME: "game"
};

const SIGN_UP_STATE = {
    SIGNED_UP_CLOSED: "signed up closed",
    SIGNED_UP_SUCCESS: "signed up success",
    SIGNED_UP_ADD_FAILURE: "signed up add failure",
    SIGNED_UP_EXIST_FAILURE: "signed up exist failure",
    SIGNED_UP_REQUESTED: "signed up requested",
    NETWORK_ERROR: "network error"
};

const PLAYER_STATUS = {
    AVAILABLE: "Available",
    PENDING: "Pending",
    IN_GAME: "In a game",
}

const GAME = {
    LOSE: "lose",
    WIN: "win",
    IN_PROGRESS: "in progress"
};

const NOTIFICATION_TYPE = {
    SYSTEM: "SYSTEM",
    GAME: "GAME"
};

let pair_book = {};
let board_pair = {};
let mines_pair = {};
let onlinePlayers = {};
let notifications = [];

// Validate the user's credentials: username && password
const validateUser = async (username, password, clientId) => {
    const users = database.collection("user");

    try {
        const querySnapshot = await users.where("username", "==", username).get();

        // Username existing in the system
        if (querySnapshot.size === 1) {
            const doc = querySnapshot.docs[0];
            if (doc.data().password === password) {
                const user = {
                    id: clientId,
                    docId: doc.id,
                    username: doc.data().username,
                    status: doc.data().gamingStatus,
                    win: doc.data().win,
                    lose: doc.data().lose,
                    onboardingComplete: doc.data().onboardingComplete,
                    gamingStatus: doc.data().gamingStatus
                }
                addOnlinePlayer(user, username);
                processNotifications(NOTIFICATION_TYPE.SYSTEM, "Welcome " + username + " to the Game Lobby!")
                return {
                    user: user,
                    loginStatus: LOGIN_STATE.LOGGED_IN,
                    page: PAGE.LOBBY
                }
            } else {
                return {
                    user: {},
                    loginStatus: LOGIN_STATE.LOGGED_INVALID_PASSWORD_FAILURE,
                    page: PAGE.LOGIN
                }
            }
        } else {  //Username not existing in the system
            return {
                user: {},
                loginStatus: LOGIN_STATE.LOGGED_NON_EXIST_USER_FAILURE,
                page: PAGE.LOGIN
            }
        }
    } catch (error) {
        console.log("LOGIN NETWORK ERROR: " + error);
        return {
            user: {},
            loginStatus: LOGIN_STATE.NETWORK_ERROR,
            page: PAGE.LOGIN
        }
    }
}

// Get all usernames in the database system
const getAllUsernames = async () => {
    const users = database.collection("user");
    let allUsernames = [];

    try {
        const querySnapshot = await users.get();
        if (querySnapshot.size > 0) {
            querySnapshot.forEach(doc => {
                allUsernames.push(doc.data().username)
            });
        } else {
            console.log("No registed users in the system yet.")
        }
        return allUsernames;
    } catch (error) {
        console.log("GET USERNAMES NETWORK ERROR: " + error);
    } 
}

// Add newly registered user to the database
const addNewUser = async (username, password) => {
    const users = database.collection("user");

    try {
        const result = await users.add({
            username: username,
            password: password,
            onboardingComplete: false,
            win: (Number)(0),
            lose: (Number)(0),
            gamingStatus: PLAYER_STATUS.AVAILABLE
        })
        return {
            registerStatus: SIGN_UP_STATE.SIGNED_UP_SUCCESS,
        }
    } catch (error) {
        console.log("ADD NEW USER ERROR: " + error);
        return {
            registerStatus: SIGN_UP_STATE.NETWORK_ERROR,
        }
    }
} 

// Add a client to the online players object
const addOnlinePlayer = (user, username) => {
    onlinePlayers[username] = user;
    console.log(onlinePlayers);
    io.sockets.emit("online players update", onlinePlayers);
}

// Update the online players object when a player logged out
const playerLogOut = player => {
    processNotifications(NOTIFICATION_TYPE.SYSTEM, player + " left the Game Lobby !");
    delete onlinePlayers[player];
    io.sockets.emit("online players update", onlinePlayers);
}

// Removes disconnected clients from the players object
const cleanUpPlayers = () => {
    const connectedClients = Object.keys(io.sockets.connected);
    const playerUsernames = Object.keys(onlinePlayers);
    for (let player of playerUsernames) {
        if (!connectedClients.includes(onlinePlayers[player].id))
            delete onlinePlayers[player];
    }
}

// Return true if the player is online
const playerIsOnline = player => Object.keys(onlinePlayers).includes(player);

// Process notifications
const processNotifications = (type, msg) => {
    const newNotification = {
        type: type,
        content: msg,
        time: new Date().getTime()
    }
    console.log("notification", newNotification.time)
    notifications.push(newNotification);
    io.sockets.emit("all notifications", notifications);
}

// When a player requests to update onboarding status
const updateOnboardingStatus = async (username, status) => {
    const docId = onlinePlayers[username].docId;
    const userDoc = database.collection("user").doc(docId);

    try {
        const result = await userDoc.set({
            onboardingComplete: status
        }, {merge: true});

        onlinePlayers[username].onboardingComplete = status;
        io.sockets.emit("online players update", onlinePlayers);
    } catch (error) {
        console.log("UPDATE ONBOARDING STATUS ERROR: " + error);
    }
}

// When an invitation is initialized, update two players gaming status to pending
const updateGamingStatus = async (requestFrom, status) => {
    const requestFromDocId = onlinePlayers[requestFrom].docId;
    // const requestToDocId = onlinePlayers[requestTo].docId;
    const requestFromPlayer = database.collection("user").doc(requestFromDocId);
    // const requestToPlayer = database.collection("user").doc(requestToDocId);

    try { 
        const resultFrom = await requestFromPlayer.set({
            gamingStatus: status
        }, {merge: true});

        // const resultTo = await requestToPlayer.set({
        //     gamingStatus: status
        // }, {merge: true});
        onlinePlayers[requestFrom].status = status;
        // onlinePlayers[requestTo].status = status;
        io.sockets.emit("online players update", onlinePlayers);

    } catch (error) {
        console.log("UPDATE STATUS ERROR: " + error)
    }
}

const incrementWinNumber = async player => {
    const docId = onlinePlayers[player].docId;
    const userDoc = database.collection("user").doc(docId);

    try {
        const result = await userDoc.update({
            win: firebase.firestore.FieldValue.increment(1)
        })
        onlinePlayers[player].win = onlinePlayers[player].win + 1;
        io.sockets.emit("online players update", onlinePlayers);
    } catch (error) {
        console.log("INCREMENT WIN NUMBER ERROR: " + error);
    }
}

const incrementLoseNumber = async player => {
    const docId = onlinePlayers[player].docId;
    const userDoc = database.collection("user").doc(docId);

    try {
        const result = await userDoc.update({
            lose: firebase.firestore.FieldValue.increment(1)
        })
        onlinePlayers[player].lose = onlinePlayers[player].lose + 1;
        io.sockets.emit("online players update", onlinePlayers);
    } catch (error) {
        console.log("INCREMENT LOSE NUMBER ERROR: " + error);
    }
}

io.on("connection", client => {
    // Emit a message to all clients (io.socketS)
    io.sockets.emit("notification", client.id + " has connected to the server");

    // When a client requests login to join the Lobby
    client.on("request to login", (username, password) => {
        cleanUpPlayers();
        // Emit a message to just this client
        validateUser(username, password, client.id).then(
            response => client.emit("login response", response)
        )
    })

    // When a client request to logout
    client.on("logout", (username) => {
        playerLogOut(username);
        client.emit("receive logout request");
    })

    // When a client request to update onboarding status
    client.on("update onboarding status", (username, status) => {
        updateOnboardingStatus(username, status).then(
            () => client.emit("updated onboarding status")
        )
    })

    // When a client requests all existing usernames in the system
    client.on("request all existing usernames", () => {
        getAllUsernames().then(
            data => client.emit("all existing usernames", data)
        )
    })

    // When a client requests to register
    client.on("request to register", (username, password) => {
        addNewUser(username, password).then(
            response => client.emit("register response", response)
        )
    })

    // When a client sends an invitation to another player
    client.on("send game invitation", (invitationFrom, invitationTo) => {
        cleanUpPlayers();
        updateGamingStatus(invitationFrom, PLAYER_STATUS.PENDING).then(
            () => {
                if (playerIsOnline(invitationTo)) {
                    updateGamingStatus(invitationTo, PLAYER_STATUS.PENDING).then(
                        () => {
                            const requestToClientId = onlinePlayers[invitationTo].id;
                            io.to(requestToClientId).emit("receive invitation", invitationFrom);
                            client.emit("successfully sent invitation to receiver");
                        })
                } else {
                    updateGamingStatus(invitationFrom, PLAYER_STATUS.AVAILABLE).then(
                        () => {
                            client.emit("receiver offline");
                        }
                    )
                }

            })
    })

    // When a client accept an invitation from another player
    client.on("accept invitation", invitationFrom => {
        const requestFromClientId = onlinePlayers[invitationFrom].id;
        io.to(requestFromClientId).emit("invitation accepted")
    })

    // When a client declines an invitation from another player
    client.on("decline invitation", invitationFrom => {
        const requestFromClientId = onlinePlayers[invitationFrom].id;
        io.to(requestFromClientId).emit("invitation declined")
    })

    // When an invitation is released (a declined invitation)
    client.on("release invitation", (invitationFrom, invitationTo) => {
        updateGamingStatus(invitationFrom, PLAYER_STATUS.AVAILABLE).then(
            () => updateGamingStatus(invitationTo, PLAYER_STATUS.AVAILABLE).then(
            () => {
                const requestFromClientId = onlinePlayers[invitationFrom].id;
                const requestToClientId = onlinePlayers[invitationTo].id;
                io.to(requestToClientId).emit("invitation released");
                io.to(requestFromClientId).emit("invitation released");
            }
        ))
    })

    // When a client asks for starting a game
    client.on("start game", (invitationFrom, invitationTo) => {
        updateGamingStatus(invitationFrom, PLAYER_STATUS.IN_GAME).then(
            () => updateGamingStatus(invitationTo, PLAYER_STATUS.IN_GAME).then(
            () => {
                const requestFromClientId = onlinePlayers[invitationFrom].id;
                const requestToClientId = onlinePlayers[invitationTo].id;
                pair_book[requestFromClientId] = requestToClientId;
                pair_book[requestToClientId] = requestFromClientId;
                io.to(requestFromClientId).emit("set pair up", invitationTo);
                io.to(requestFromClientId).emit("set current color", "red");
                io.to(requestFromClientId).emit("set pair color", "green");
                io.to(requestFromClientId).emit("get init board");
                io.to(requestFromClientId).emit("received start game request");
                io.to(requestToClientId).emit("set pair up", invitationFrom);
                io.to(requestToClientId).emit("set current color", "green");
                io.to(requestToClientId).emit("set pair color", "red");
                io.to(requestToClientId).emit("received start game request");
            }
        ))
    })

    // When a game is over and the client asks for closing the game
    client.on("close game", player => {
        updateGamingStatus(player, PLAYER_STATUS.AVAILABLE).then(
            () => {
                const clientId = onlinePlayers[player].id;
                io.to(clientId).emit("received close game request")
            }
        )
    })

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
        console.log("update pair status: ", status);
        const p1 = client.id;
        const p2 = pair_book[p1];
        io.to(p2).emit("set pair status", status);
    });

    // Update the player's total win number
    client.on("update win status", player => {
        incrementWinNumber(player).then(
            () => {
                const playerClientId = onlinePlayers[player].id;
                io.to(playerClientId).emit("updated win status");
            }
        )
    })

    // Update the player's total lose number
    client.on("update lose status", player => {
        incrementLoseNumber(player).then(
            () => {
                const playerClientId = onlinePlayers[player].id;
                io.to(playerClientId).emit("updated lose status");
            }
        )

    }) 
    // // Send messages to and receive messages from the client in here
    // if (!client_list.includes(client.id)) {
    //     client_list.push(client.id);
    // }

    // client.emit("hello", "hello client");
    // client.emit("client id", client.id);

    // if (client_list.length > 0 &&
    //     client_list.length % 2 == 0 &&
    //     !pair_book[client.id]) {
    //     const length = client_list.length;
    //     const p2 = client_list[length - 2];
    //     const p1 = client_list[length - 1];
    //     pair_book[p2] = p1;
    //     pair_book[p1] = p2;    
    //     client.emit("set pair up", p1, p2);
    //     io.to(p2).emit("set pair up", p1, p2);
    //     client.emit("get init board", p1);
    // }







    // ------------------------------------------------------ //

    // client.on("join", username => {
    //     io.sockets.emit("set connected");
    //     clients[client.id] = username;
    //     messages.push(username + " has joined the chat");
    //     io.sockets.emit("all messages", messages);
    // });

    // client.on("new message", msg => {
    //     messages.push(clients[client.id] + ": " + msg)
    //     io.sockets.emit("all messages", messages);
    // });

    // client.on("disconnect", () => {
    //     if (clients.hasOwnProperty(client.id)) {
    //         const username = clients[client.id];
    //         messages.push(username + " has left the chat");
    //         io.sockets.emit("all messages", messages);
    //     }
    // });

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