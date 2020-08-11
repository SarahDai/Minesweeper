import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GAME } from "../../redux/storeConstants";
import { ModalBody, Modal, Button, ModalFooter } from "reactstrap";
import { closeGame } from "../../redux/actions/connectActions";


const GameOptions = () => {
    const status = useSelector(state => state.game.status);
    const dispatch = useDispatch();

    const displayContent = () => {
        if (status === GAME.WIN) {
            return <ModalBody>Wooooo, you win!</ModalBody>
        } else if (status === GAME.LOSE) {
            return <ModalBody>Game Over, you lose.</ModalBody>
        }
    }

    const handleBackToLobby = () => {
        dispatch(closeGame());
    }

    return (
        <Modal centered isOpen={status !== GAME.IN_PROGRESS}>
            {displayContent()}
            <ModalFooter>
                <Button color="success" onClick={() => handleBackToLobby()}>Back Lobby</Button>
            </ModalFooter>
        </Modal>
    )
}

export default GameOptions;