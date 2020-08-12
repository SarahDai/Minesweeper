import React from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import { CardColumns, Card, CardHeader, Badge } from "reactstrap";

const getSortedNotifications = notifications => {
    return notifications.sort((a,b) => b.time - a.time);
}

const SystemNotification = () => {
    const notifications = useSelector(state => state.user.notifications);
    console.log("system notification", notifications);

    return (
        <>
            <Card body outline className="system-notification-frame">
                <Card style={{color: "rosybrown"}} className="margin-bottom-half">
                    <CardHeader tag="h3" className="bold text-centered">SYSTEM Notificition</CardHeader>
                </Card>
                <Badge color="secondary margin-bottom-half">latest notifications</Badge>
                <CardColumns className="notification-list">
                    {
                        getSortedNotifications(notifications).map((notification, index) => 
                            <Notification key={`msg-${index}`} notification={notification} />
                        )
                    }
                </CardColumns>
            </Card>
        </>
    )
} 

export default SystemNotification;