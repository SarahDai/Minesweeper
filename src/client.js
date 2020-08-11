import store from "./redux/store";
import { setAllMessages, setConnected, getNewBoard, setClientID, setGameBoard, setGamePair, setGameMines, setGameStatus, validateUser, updateWinStatus, updateLoseStatus } from "./redux/actions";
import { loginResponse, registerReponse, getAllUsernames, waitForResponse,
    receivedInvitation, updatePlayers, acceptedInvitation, declinedInvitation,
    setPage, closedInvitation, loggedOut, updatedOnboardingStatus, updateNotifications, setgameClosed,
     } from "./redux/actions/connectActions";
import { PAGE } from "../src/redux/storeConstants";

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

// Update all online players information
socket.on("online players update", players => {
    store.dispatch(updatePlayers(players))
})

// Update notifications
socket.on("all notifications", notifications => {
    store.dispatch(updateNotifications(notifications));
})


// Request to login to join the game lobby
export const joinLobby = (username, password) => {
    socket.emit("request to login", username, password);

    socket.on("login response", response => {
        store.dispatch(loginResponse(response));
    });
}

// Request to logout 
export const setLogoutToServer = (username) => {
    socket.emit("logout", username);

    socket.on("receive logout request", () => {
        store.dispatch(loggedOut());
    })
}

export const setOnboardingToServer = (username, status) => {
    socket.emit("update onboarding status", username, status);

    socket.on("updated onboarding status", () => {
        store.dispatch(updatedOnboardingStatus(status));
    })
}

// Request to register with valid username-pwd
export const register = (username, password) => {
    socket.emit("request to register", username, password);

    socket.on("register response", response => {
        console.log("register", response.registerStatus)
        store.dispatch(registerReponse(response));
    })
}

// Request game invitation to another player
export const sendInvitationToServer = (invitationFrom, invitationTo) => {
    socket.emit("send game invitation", invitationFrom, invitationTo);

    socket.on("successfully sent invitation to receiver", () => {
        store.dispatch(waitForResponse());
    })

    //TODO
    socket.on("receiver offline", () => {
        store.dispatch(declinedInvitation());
        setTimeout(store.dispatch(closedInvitation()), 500);
    })

    socket.on("invitation accepted", () => {
        store.dispatch(acceptedInvitation())
    })

    socket.on("invitation declined", () => {
        store.dispatch(declinedInvitation())
    })
}

// Receive game invitation from the sender
socket.on("receive invitation", invitationFrom => {
    store.dispatch(receivedInvitation(invitationFrom))
})

// The invitation receiver sent accept response to server
export const acceptInvitationToServer = invitationFrom => {
    socket.emit("accept invitation", invitationFrom);
}

// The invitation receiver sent declined response to server
export const declineInvitationToServer = invitationFrom => {
    socket.emit("decline invitation", invitationFrom)
}

// Send release invitation notice to server by declined invitation
export const releaseInvitationToServer = (invitationFrom, invitationTo) => {
    socket.emit("release invitation", invitationFrom, invitationTo);
}

// Release the player's invitation status
socket.on("invitation released", () => {
    store.dispatch(closedInvitation());
})

// Send start game notice to server by accepted invitation
export const startGameToServer = (invitationFrom, invitationTo) => {
    socket.emit("start game", invitationFrom, invitationTo);
}

// Start the game by changing to game page
socket.on("received start game request", () => {
    store.dispatch(closedInvitation());
    store.dispatch(setPage(PAGE.GAME));
})

// Close the game by changing to lobby page
export const closeGameToServer = player => {
    socket.emit("close game", player);
}

socket.on("received close game request", () => {
    store.dispatch(setgameClosed());
    store.dispatch(setPage(PAGE.LOBBY));
})

// Pair up the two players
socket.on("set pair up", player => {
    store.dispatch(setGamePair(player));
});


// Get the initial board from one player
socket.on("get init board", () => {
    const newBoard = getNewBoard();
    const newMines = store.getState().game.mines;
    const newStatus = store.getState().game.status;
    socket.emit("update pair board", newBoard);
    socket.emit("update pair mines", newMines);
    socket.emit("update pair status", newStatus);
});

// Set the pair player's board
socket.on("set pair board", board => {
    console.log("client pair board");
    store.dispatch(setGameBoard(board));
});


// Set the pair player's mine locations
socket.on("set pair mines", mines => {
    store.dispatch(setGameMines(mines));
});

// Set the pair player's status
socket.on("set pair status", status => {
    store.dispatch(setGameStatus(status));
});

// Request to update pair player's board
export const updateBoard = board => {
    socket.emit("update pair board", board);
};

// Request to update pair player's mine locations
export const updateMines = mines => {
    socket.emit("update pair mines", mines);
};

// Request to update pair player's status
export const updatePairStatus = status => {
    socket.emit("update pair status", status);
};

// Request to update win status
export const sendWinStatusToServer = player => {
    socket.emit("update win status", player);
}

socket.on("updated win status", () => {
    store.dispatch(updateWinStatus());
})

export const sendLoseStatusToServer = player => {
    socket.emit("update lose status", player);
}

socket.on("updated lose status", () => {
    store.dispatch(updateLoseStatus());
})

// socket.on("all messages", msg => {
//     store.dispatch(setAllMessages(msg));
// });

// socket.on("set connected", () => {
//     store.dispatch(setConnected());
// });

export const newMessage = msg => {
    socket.emit("new message", msg);
};

// socket.on("client id", cid => {
//     store.dispatch(setClientID(cid));
// });