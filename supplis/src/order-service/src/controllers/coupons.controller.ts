import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody, response} from '@loopback/rest';
import {
  authenticate,
  AuthenticationBindings,
  IAuthUser,
  STRATEGY,
} from 'loopback4-authentication';
import {inject} from '@loopback/core';
import {Coupons} from '../models';
import {CouponsRepository} from '../repositories';

export class CouponsController {
  constructor(
    @repository(CouponsRepository)
    public couponsRepository: CouponsRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @post('/coupons')
  @response(200, {description: 'Coupon created'})
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['code', 'type', 'value'],
            properties: {
              code: {type: 'string'},
              type: {type: 'string', enum: ['flat', 'percentage']},
              value: {type: 'number', minimum: 0},
              expiryDate: {type: 'string', format: 'date-time'},
              minCartValue: {type: 'number', minimum: 0},
            },
          },
        },
      },
    })
    coupon: Coupons,
    @inject(AuthenticationBindings.CURRENT_USER) currentUser: IAuthUser,
  ): Promise<Coupons> {
    const user = currentUser as IAuthUser & {role?: string; roles?: string[]};
    const roles = user.roles ?? (user.role ? [user.role] : []);
    if (!roles.includes('Admin')) {
      throw new HttpErrors.Forbidden('Only Admin users can create coupons.');
    }
    const code = coupon.code?.trim().toUpperCase();
    if (!code || !coupon.type || coupon.value === undefined || coupon.value < 0) {
      throw new HttpErrors.UnprocessableEntity('A valid code, type, and value are required.');
    }
    if (coupon.type === 'percentage' && coupon.value > 100) {
      throw new HttpErrors.UnprocessableEntity('Percentage discounts cannot exceed 100.');
    }
    return this.couponsRepository.create({
      ...coupon,
      code,
      isActive: coupon.isActive ?? true,
    });
  }

  @post('/coupons/validate')
  @response(200, {description: 'Coupon validation result'})
  async validate(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['code', 'cartTotal'],
            properties: {code: {type: 'string'}, cartTotal: {type: 'number'}},
          },
        },
      },
    })
    request: {code: string; cartTotal: number},
  ): Promise<{discountAmount: number}> {
    const coupon = await this.couponsRepository.findOne({
      where: {code: request.code.trim().toUpperCase(), isActive: true},
    });
    if (!coupon || (coupon.expiryDate && new Date(coupon.expiryDate) < new Date())) {
      throw new HttpErrors.BadRequest('Invalid or expired coupon.');
    }
    if (coupon.minCartValue && request.cartTotal < coupon.minCartValue) {
      throw new HttpErrors.BadRequest(`Minimum cart value is ₹${coupon.minCartValue}.`);
    }
    const discountAmount = coupon.type === 'percentage'
      ? Math.min(request.cartTotal, request.cartTotal * (coupon.value ?? 0) / 100)
      : Math.min(request.cartTotal, coupon.value ?? 0);
    return {discountAmount};
  }
}
