import React from "react";
import { useSelector } from "react-redux";
import { Table, Card, CardHeader } from "reactstrap";
import Player from "./Player";

const OnlinePlayers = () => {
    const onlinePlayers = useSelector(state => state.user.onlinePlayers);

    return (
        <>
            <Card className="online-player-frame">
                <Card style={{color: "rosybrown"}} className="margin-bottom-half">
                    <CardHeader tag="h3" className="bold text-centered">ONLINE Players</CardHeader>
                </Card>
                <Table className="my-2">
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
            </Card>
        </>
    )

}

export default OnlinePlayers;