import {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {useAuth} from '../context/AuthContext';

interface RealtimeNotification {
  id?: string;
  subject?: string;
  body?: string;
}

interface VisibleNotification extends RealtimeNotification {
  key: number;
}

const SOCKET_URL =
  import.meta.env.VITE_NOTIFICATION_SOCKET_URL ?? 'http://localhost:3004';

export const NotificationToasts = () => {
  const {token} = useAuth();

  if (!token) return null;
  return <AuthenticatedNotificationToasts token={token} />;
};

const AuthenticatedNotificationToasts = ({token}: {token: string}) => {
  const [notifications, setNotifications] = useState<VisibleNotification[]>([]);

  useEffect(() => {
    const socket = io(SOCKET_URL, {auth: {token}});
    socket.on('connect_error', error => {
      console.error('Notification socket connection failed:', error.message);
    });
    socket.on('notification', (notification: RealtimeNotification) => {
      const key = Date.now() + Math.random();
      setNotifications(current => [...current, {...notification, key}]);
      window.setTimeout(() => {
        setNotifications(current => current.filter(item => item.key !== key));
      }, 6000);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  if (notifications.length === 0) return null;

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{zIndex: 1100, maxWidth: '24rem'}}
      aria-live="polite"
      aria-atomic="false"
    >
      {notifications.map(notification => (
        <div className="toast show mb-2" role="status" key={notification.key}>
          <div className="toast-header">
            <strong className="me-auto">
              {notification.subject || 'Notification'}
            </strong>
            <button
              type="button"
              className="btn-close"
              aria-label="Dismiss notification"
              onClick={() =>
                setNotifications(current =>
                  current.filter(item => item.key !== notification.key),
                )
              }
            />
          </div>
          {notification.body && (
            <div className="toast-body">{notification.body}</div>
          )}
        </div>
      ))}
    </div>
  );
};
