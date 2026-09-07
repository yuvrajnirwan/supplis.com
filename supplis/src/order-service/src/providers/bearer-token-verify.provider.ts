import {Provider} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {verify} from 'jsonwebtoken';
import {VerifyFunction} from 'loopback4-authentication';

export class BearerTokenVerifyProvider
  implements Provider<VerifyFunction.BearerFn>
{
  value(): VerifyFunction.BearerFn {
    return async (token: string) => {
      try {
        const secret = process.env.JWT_SECRET ?? 'your-shared-jwt-secret';
        return verify(token, secret) as any;
      } catch (err) {
        throw new HttpErrors.Unauthorized('Invalid or expired token');
      }
    };
  }
}
