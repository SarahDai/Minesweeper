import React from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";

const SystemNotification = () => {
    const notifications = useSelector(state => state.user.notifications);

    return (
        <Row>
            <Col>
                {
                    notifications.map((notification, index) => {
                        <Notification key={`msg-${index}`} notification={notification} />
                    })
                }
            </Col>
        </Row>
    )

} 

export default SystemNotification;