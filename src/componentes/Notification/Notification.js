import PushNotification from "react-native-push-notification";

export default function Notification() {  
// Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.log("TOKEN:", token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);

            // process the notification

            // (required) Called when a remote is received or opened, or local notification is opened
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);

            // process the action
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function(err) {
            console.error(err.message, err);
        },


        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
    });
  
    PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        message: `Ya esta disponible el producto`, // (required)
        date: new Date(Date.now() + 60 * 1000), // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

        /* Android Only Properties */
        repeatTime: 1, // (optional) Increment of configured repeateType. Check 'Repeating Notifications' section for more info.
    });

}