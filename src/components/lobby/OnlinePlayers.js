import React from "react";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import Player from "./Player";

const OnlinePlayers = () => {
    const onlinePlayers = useSelector(state => state.user.onlinePlayers);

    return (
        <>
            <Table striped bordered className="my-2">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Win</th>
                        <th>Lose</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(onlinePlayers).map((player, index) => 
                            <Player key={`player-${index}`} 
                                    player={onlinePlayers[player]} />
                        )
                    }
                </tbody>
            </Table>
        </>
    )

}

export default OnlinePlayers;