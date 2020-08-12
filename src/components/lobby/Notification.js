import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

const Notification = props => {
    return (
        <div>
            <Card className="boarder-color-secondary">
                <CardHeader>
                    {props.notification.type}{" "}
                    {new Date(props.notification.time).toLocaleString()}
                </CardHeader>
                <CardBody>
                    {props.notification.content}
                </CardBody>
            </Card>
        </div>
    )
}

export default Notification;