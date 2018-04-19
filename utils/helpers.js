import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const keys = {
  STORAGE_KEY: 'paulakedouk:flashcards_storage',
  NOTIFICATION_KEY: 'paulakedouk:flashcards_notification'
};

export const colors = {
  white: '#fff',
  darkBlue: '#333241',
  lightBlue: '#5d5d71',
  blue: '#a0b0be',
  green: '#56be71',
  red: '#be382d'
};

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return todayUTC.toISOString().split('T')[0];
}

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
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4();
}
export function clearLocalNotification() {
  return AsyncStorage.removeItem(keys.NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
}
export function setLocalNotification() {
  AsyncStorage.getItem(keys.NOTIFICATION_KEY)
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
            AsyncStorage.setItem(keys.NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}
