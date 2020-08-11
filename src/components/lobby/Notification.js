import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

const Notification = props => {
    console.log()
    return (
        <div>
            <Card>
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