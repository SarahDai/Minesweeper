import React from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import { CardColumns } from "reactstrap";

const SystemNotification = () => {
    const notifications = useSelector(state => state.user.notifications);

    return (
        <>
            <CardColumns className="notification-list">
                {
                    notifications.map((notification, index) => 
                        <Notification key={`msg-${index}`} notification={notification} />
                    )
                }
            </CardColumns>
        </>
    )

} 

export default SystemNotification;