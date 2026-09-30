import {sign} from 'jsonwebtoken';

interface PaidOrderNotification {
  orderId: string;
  userId: string;
  username: string;
  kind: 'payment' | 'order-confirmed';
}

export async function publishPaidOrderNotification(
  notification: PaidOrderNotification,
): Promise<void> {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error(
      'JWT_SECRET must be configured to authenticate notifications.',
    );
  }

  const serviceToken = sign(
    {
      id: notification.userId,
      username: notification.username,
      permissions: ['CreateNotification', '2'],
    },
    jwtSecret,
    {expiresIn: '60s'},
  );
  const notificationServiceUrl = (
    process.env.NOTIFICATION_SERVICE_URL ?? 'http://127.0.0.1:3004'
  ).replace(/\/+$/, '');

  const response = await fetch(`${notificationServiceUrl}/notifications`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serviceToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject:
        notification.kind === 'payment'
          ? 'Payment successful'
          : 'Order confirmed',
      body:
        notification.kind === 'payment'
          ? `Payment for order #${notification.orderId} was successful.`
          : `Your order #${notification.orderId} is confirmed and will be processed soon.`,
      receiver: {
        to: [{type: 0, id: notification.userId}],
      },
      type: 0,
      sentDate: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Notification service returned ${response.status}${details ? `: ${details}` : ''}`,
    );
  }
}
