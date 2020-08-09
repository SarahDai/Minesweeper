import store from "./redux/store";
import { setAllMessages, setConnected, getNewBoard, setClientID, setGameBoard, setGamePair, setGameMines, setGameStatus, validateUser } from "./redux/actions";
import { loginResponse, registerReponse, getAllUsernames } from "./redux/actions/connectActions";

/** CLIENT CONFIGURATION - connect to the server */
const socketIOClient = require("socket.io-client");

// When deployed, connect to the hosted server, otherwise connect to local server
// Localhost port must match server
let host = process.env.NODE_ENV === 'production' ?
    "appname.herokuapp.com" : "localhost:4002"   
let socket = socketIOClient.connect(host, {secure: true});
// Checks which host we're connected to (for troubleshooting);
console.log("connected to " + host);

// Print out a notification from the server (for debuging)
socket.on("notification", message => {
    console.log(message);
});

// Request to get all existing usernames in the database
export const getUsernames = () => {
    socket.emit("request all existing usernames");

    socket.on("all existing usernames", allUsernames => {
        store.dispatch(getAllUsernames(allUsernames));
    })
}

export const joinLobby = (username, password) => {
    socket.emit("request to login", username, password);

    socket.on("login response", response => {
        store.dispatch(loginResponse(response));
    });
}

export const register = (username, password) => {
    socket.emit("request to register", username, password);

    socket.on("register response", response => {
        console.log("register", response.registerStatus)
        store.dispatch(registerReponse(response));
    })
}














// socket.on("hello", msg => {
//     console.log("server said: " + msg);
// });

// socket.on("client id", cid => {
//     store.dispatch(setClientID(cid));
// });

// socket.on("get init board", cid => {
//     if (store.getState().user.clientID === cid) {
//         const newBoard = getNewBoard();
//         const newMines = store.getState().game.mines;
//         const newStatus = store.getState().game.status;
//         socket.emit("update pair board", newBoard);
//         socket.emit("update pair mines", newMines);
//         socket.emit("update pair status", newStatus);
//     }
// });

// socket.on("all messages", msg => {
//     store.dispatch(setAllMessages(msg));
// });

// socket.on("set connected", () => {
//     store.dispatch(setConnected());
// });

// socket.on("set pair board", board => {
//     console.log("client pair board");
//     store.dispatch(setGameBoard(board));
// });

// socket.on("set pair mines", mines => {
//     store.dispatch(setGameMines(mines));
// });

// socket.on("set pair status", status => {
//     store.dispatch(setGameStatus(status));
// });

// socket.on("set pair up", (p1, p2) => {
//     const cur = store.getState().user.clientID;
//     if (cur === p1) {
//         store.dispatch(setGamePair(p2));
//     } else if (cur === p2) {
//         store.dispatch(setGamePair(p1));
//     }
// });

// /** Login to Server **/
export const joinChat = username => {
    socket.emit("join", username);
};

export const newMessage = msg => {
    socket.emit("new message", msg);
};

export const updateBoard = board => {
    socket.emit("update pair board", board);
};

export const updateMines = mines => {
    socket.emit("update pair mines", mines);
};

export const updatePairStatus = status => {
    socket.emit("update pair status", status);
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


