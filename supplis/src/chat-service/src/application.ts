import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, Provider} from '@loopback/core';
import {HttpErrors, RestApplication} from '@loopback/rest';
import {RepositoryMixin} from '@loopback/repository';
import {
  AuthenticationComponent,
  IAuthUser,
  Strategies,
  VerifyFunction,
} from 'loopback4-authentication';
import {AuthorizationComponent, AuthorizationBindings} from 'loopback4-authorization';
import {ChatServiceBindings, ChatServiceComponent} from '@sourceloop/chat-service';
import {ServiceSequence} from '@sourceloop/core';
import {verify} from 'jsonwebtoken';

export {ApplicationConfig};

class BearerVerifierProvider implements Provider<VerifyFunction.BearerFn> {
  value(): VerifyFunction.BearerFn {
    return async (token: string) => {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET must be configured for chat authentication.');
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

export class ChatServiceApplication extends BootMixin(
  RepositoryMixin(RestApplication),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.sequence(ServiceSequence);
    this.bind(ChatServiceBindings.Config).to({useCustomSequence: true});
    this.bind(AuthorizationBindings.CONFIG).to({
      allowAlwaysPaths: ['/explorer', '/openapi.json'],
    });
    this.bind(AuthorizationBindings.PERMISSION).to({
      MessageController: {
        create: ['*'],
        find: ['*'],
      },
    });

    this.component(AuthenticationComponent);
    this.component(AuthorizationComponent);
    this.bind(Strategies.Passport.BEARER_TOKEN_VERIFIER).toProvider(
      BearerVerifierProvider,
    );
    this.component(ChatServiceComponent);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
