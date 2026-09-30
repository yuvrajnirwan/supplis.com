import './load-env';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, Provider} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {
  NotifServiceBindings,
  NotificationServiceComponent,
} from '@sourceloop/notification-service';
import {IAuthUser, Strategies, VerifyFunction} from 'loopback4-authentication';
import {AuthenticationComponent} from 'loopback4-authentication';
import {
  AuthorizationBindings,
  AuthorizationComponent,
} from 'loopback4-authorization';
import {NotificationBindings} from 'loopback4-notifications';
import {
  SocketBindings,
  SocketIOProvider,
} from 'loopback4-notifications/socketio';
import {verify} from 'jsonwebtoken';
export {ApplicationConfig};

class BearerVerifierProvider implements Provider<VerifyFunction.BearerFn> {
  value(): VerifyFunction.BearerFn {
    return async (token: string) => {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET must be configured for notification auth.');
      }

      try {
        const payload = verify(token, secret);
        if (typeof payload === 'string') {
          throw new Error('JWT payload must be an object.');
        }
        const username = payload.username ?? payload.authId ?? payload.name;
        if (typeof username !== 'string') {
          throw new Error('JWT payload does not identify a user.');
        }
        return {...payload, username} as IAuthUser;
      } catch {
        throw new HttpErrors.Unauthorized('Invalid or expired token');
      }
    };
  }
}

export class NotificationServiceApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    const port = Number(process.env.PORT ?? 3004);
    const socketServerUrl =
      process.env.SOCKETIO_SERVER_URL ?? `http://127.0.0.1:${port}`;

    // Set up the custom sequence
    this.sequence(MySequence);
    this.component(NotificationServiceComponent);

    this.bind(NotifServiceBindings.Config).to({
      useCustomSequence: true,
    });
    this.component(AuthenticationComponent);
    this.component(AuthorizationComponent);
    this.bind(Strategies.Passport.BEARER_TOKEN_VERIFIER).toProvider(
      BearerVerifierProvider,
    );
    this.bind(AuthorizationBindings.CONFIG).to({
      allowAlwaysPaths: ['/explorer', '/openapi.json'],
    });

    this.bind(SocketBindings.Config).to({
      url: socketServerUrl,
      defaultPath: 'notifications',
      options: {
        auth: {
          serviceToken: process.env.SOCKETIO_SERVICE_TOKEN,
        },
      },
    });
    this.bind(NotificationBindings.PushProvider).toProvider(SocketIOProvider);
    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
