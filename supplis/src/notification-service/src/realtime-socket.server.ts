import {Server as HttpServer} from 'http';
import {JwtPayload, verify} from 'jsonwebtoken';
import {Server as SocketServer} from 'socket.io';

interface NotificationMessage {
  receiver?: {
    to?: Array<{id?: string}>;
  };
  [key: string]: unknown;
}

interface UserJwtPayload extends JwtPayload {
  id?: string;
  userId?: string;
}

export function attachRealtimeSocketServer(
  httpServer: HttpServer,
): SocketServer {
  const jwtSecret = process.env.JWT_SECRET;
  const serviceToken = process.env.SOCKETIO_SERVICE_TOKEN;
  if (!jwtSecret || !serviceToken) {
    throw new Error(
      'JWT_SECRET and SOCKETIO_SERVICE_TOKEN must be configured for realtime notifications.',
    );
  }

  const socketServer = new SocketServer(httpServer, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
    },
  });

  socketServer.use((socket, next) => {
    const auth = socket.handshake.auth as
      {token?: unknown; serviceToken?: unknown} | undefined;

    if (auth?.serviceToken === serviceToken) {
      socket.data.isNotificationPublisher = true;
      next();
      return;
    }

    if (typeof auth?.token !== 'string') {
      next(new Error('Authentication required.'));
      return;
    }

    try {
      const payload = verify(auth.token, jwtSecret) as UserJwtPayload;
      const userId = payload.userId ?? payload.id ?? payload.sub;
      if (!userId) {
        next(new Error('Token does not identify a user.'));
        return;
      }
      socket.data.userId = userId;
      next();
    } catch {
      next(new Error('Invalid or expired token.'));
    }
  });

  socketServer.on('connection', socket => {
    if (!socket.data.isNotificationPublisher) {
      // eslint-disable-next-line no-void
      void socket.join(socket.data.userId as string);
      console.info('[realtime] Authenticated browser joined notification room.');
      return;
    }

    console.info('[realtime] Notification publisher connected.');
    socket.on('notifications', (serializedMessage: unknown) => {
      if (typeof serializedMessage !== 'string') {
        console.warn('[realtime] Rejected non-string publish payload.');
        return;
      }

      let message: NotificationMessage;
      try {
        message = JSON.parse(serializedMessage) as NotificationMessage;
      } catch {
        console.error('Rejected malformed notification message.');
        return;
      }

      let deliveredSockets = 0;
      for (const recipient of message.receiver?.to ?? []) {
        if (recipient.id) {
          deliveredSockets +=
            socketServer.sockets.adapter.rooms.get(recipient.id)?.size ?? 0;
          socketServer.to(recipient.id).emit('notification', message);
        }
      }
      console.info(
        `[realtime] Published notification to ${deliveredSockets} connected recipient socket(s).`,
      );
    });
  });

  return socketServer;
}
