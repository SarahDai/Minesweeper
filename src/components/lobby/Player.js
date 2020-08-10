import React from "react";
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { PLAYER_STATUS } from "../../redux/storeConstants";
import { sendInvitation } from "../../redux/actions/connectActions";

const getPlayername = (name, target) => {
    return name === target? "Me(" + name + ")"  : name;
}

const Player = props => {
    const username = useSelector(state => state.user.user.username);
    const dispatch = useDispatch();
    console.log("username", username)
    console.log("player", props.player.username)

    const displayAction = () => {
        if (props.player.username !== username) {
            if (props.player.status === PLAYER_STATUS.PENDING) {
                    return <Button color="warning" disabled>{props.player.status}</Button>
            }
            else if (props.player.status === PLAYER_STATUS.IN_GAME) {
                return <Button color="danger" disabled>{props.player.status}</Button>
            }
            else if (props.player.status === PLAYER_STATUS.AVAILABLE) {
                    return <Button color="success" onClick={() => invite()}>Send Invitation</Button>
            }
        }
    }

    const invite = () => {
        dispatch(sendInvitation(username, props.player.username));
    }

    return (
        <tr className="player-info">
            <td>{getPlayername(props.player.username, username)}</td>
            <td>{props.player.win}</td>
            <td>{props.player.lose}</td>
            <td>{props.player.status}</td>
            <td>{
                displayAction()
            }</td>
        </tr>
    )

}

export default Player;