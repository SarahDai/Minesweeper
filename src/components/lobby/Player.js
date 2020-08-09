import React from "react";
import { } from "reactstrap";
import { useSelector } from "react-redux";

const getPlayername = (name, target) => {
    return name === target? "Me" : name;
}

const Player = props => {
    const username = useSelector(state => state.user.username);

    const sendInvitation = () => {

    }

    return (
        <tr className="player-info">
            <td>{getPlayername(props.player.username, username)}</td>
            <td>{props.player.status}</td>
            <td>{props.player.win}</td>
            <td>{props.player.lose}</td>
        </tr>
    )

}

export default Player;