import React from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import { CardColumns } from "reactstrap";

const getSortedNotifications = notifications => {
    return notifications.sort((a,b) => b.time - a.time);
}

const SystemNotification = () => {
    const notifications = useSelector(state => state.user.notifications);
    console.log("system notification", notifications);

    return (
        <>
            <CardColumns className="notification-list">
                {
                    getSortedNotifications(notifications).map((notification, index) => 
                        <Notification key={`msg-${index}`} notification={notification} />
                    )
                }
            </CardColumns>
        </>
    )
} 

export default SystemNotification;