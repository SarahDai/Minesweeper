import React from "react";
import { Toast, ToastHeader } from "reactstrap";

const Notification = props => {
    return (
        <Toast className="notification">
            <ToastHeader id="notification-header">
                {props.notification.type + " " + props.notification.time}
            </ToastHeader>
            <ToastBody id="notification-content">{props.notification.content}</ToastBody>
        </Toast>
    )
}

export default Notification;