import {inject, Provider} from '@loopback/core';
import {Request} from '@loopback/rest';
// Use require to avoid needing @types/passport-local in this repo
const PassportLocal: any = require('passport-local');
import {Strategies} from 'loopback4-authentication';
import {VerifyFunction} from 'loopback4-authentication';
import {isEmpty} from 'lodash';

export type LocalPasswordStrategyFactory = (
  options?: any /* PassportLocal.IStrategyOptions | PassportLocal.IStrategyOptionsWithRequest */,
  verifierPassed?: VerifyFunction.LocalPasswordFn,
) => any /* PassportLocal.Strategy */;

export class LocalPasswordStrategyFactoryProvider
  implements Provider<LocalPasswordStrategyFactory>
{
  constructor(
    @inject(Strategies.Passport.LOCAL_PASSWORD_VERIFIER)
    private readonly verifierLocal: VerifyFunction.LocalPasswordFn,
  ) {}

  value(): LocalPasswordStrategyFactory {
    return (options, verifier) => this.getLocalStrategyVerifier(options, verifier);
  }

  getLocalStrategyWithRequest(verifyFn: VerifyFunction.LocalPasswordFn) {
    return async (
      req: Request,
      username: string,
      password: string,
      cb: (err: Error | null, user?: any | false) => void,
    ) => {
      try {
        const user = await verifyFn(username, password, req);
        if (!user) {
          return cb(null, false);
        }
        cb(null, user);
      } catch (err) {
        cb(err as Error);
      }
    };
  }

  getLocalStrategyWithoutRequest(verifyFn: VerifyFunction.LocalPasswordFn) {
    return async (
      username: string,
      password: string,
      cb: (err: Error | null, user?: any | false) => void,
    ) => {
      try {
        const user = await verifyFn(username, password);
        if (!user) {
          return cb(null, false);
        }
        cb(null, user);
      } catch (err) {
        cb(err as Error);
      }
    };
  }

  getDefaultLocalStrategy(verifyFn: VerifyFunction.LocalPasswordFn) {
    return async (
      username: string,
      password: string,
      cb: (err: Error | null, user?: any | false) => void,
    ) => {
      try {
        const user = await verifyFn(username, password, undefined as any);
        if (!user) {
          return cb(null, false);
        }
        cb(null, user);
      } catch (err) {
        cb(err as Error);
      }
    };
  }

  getLocalStrategyVerifier(options?: any, verifierPassed?: VerifyFunction.LocalPasswordFn): any {
    const verifyFn = verifierPassed ?? this.verifierLocal;

    if (options?.passReqToCallback) {
      return new PassportLocal.Strategy(
        options,
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.getLocalStrategyWithRequest(verifyFn),
      );
    } else if (!!options && !isEmpty(options)) {
      return new PassportLocal.Strategy(
        options,
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.getLocalStrategyWithoutRequest(verifyFn),
      );
    } else {
      return new PassportLocal.Strategy(
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this.getDefaultLocalStrategy(verifyFn),
      );
    }
  }
}
