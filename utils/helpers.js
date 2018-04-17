import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const key = 'NOTIFICATIONS';

function createNotification() {
  return {
    title: 'FlashCards',
    body: "Don't forget to take a FlashCards today! 👋",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}
export function setLocalNotification() {
  AsyncStorage.getItem(key)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);
            Notifications.scheduleLocalNotificationAsync(createNotification(), { time: tomorrow, repeat: 'day' });
            AsyncStorage.setItem(key, JSON.stringify(true));
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}
