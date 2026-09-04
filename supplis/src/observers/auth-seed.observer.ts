import {
  LifeCycleObserver,
  lifeCycleObserver,
} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  AuthClientRepository,
  RoleRepository,
  TenantRepository,
  UserRepository,
  UserTenantRepository,
} from '@sourceloop/authentication-service';
import {TenantStatus, UserStatus} from '@sourceloop/core';
import {v4 as uuidv4} from 'uuid';

@lifeCycleObserver('datasource')
export class AuthSeedObserver implements LifeCycleObserver {
  constructor(
    @repository(TenantRepository)
    private tenantRepo: TenantRepository,
    @repository(RoleRepository)
    private roleRepo: RoleRepository,
    @repository(AuthClientRepository)
    private authClientRepo: AuthClientRepository,
    @repository(UserRepository)
    private userRepo: UserRepository,
    @repository(UserTenantRepository)
    private userTenantRepo: UserTenantRepository,
  ) {}

  async start(): Promise<void> {
    try {
      // 1. Ensure master tenant exists
      let tenant = await this.tenantRepo.findOne({where: {key: 'master'}});
      if (!tenant) {
        tenant = await this.tenantRepo.create({
          id: uuidv4(),
          name: 'Master Tenant',
          key: 'master',
          status: TenantStatus.ACTIVE,
        });
      }

      // 2. Ensure default role exists
      let role = await this.roleRepo.findOne({where: {tenantId: tenant.id}});
      if (!role) {
        role = await this.roleRepo.create({
          id: uuidv4(),
          name: 'User',
          tenantId: tenant.id,
          roleType: 0,
          permissions: ['*'],
        });
      }

      // 3. Ensure 'webapp' auth client exists
      let client = await this.authClientRepo.findOne({where: {clientId: 'webapp'}});
      if (!client) {
        const lastClient = await this.authClientRepo.find({
          order: ['id DESC'],
          limit: 1,
        });
        const nextId = (lastClient[0]?.id ?? 0) + 1;
        client = await this.authClientRepo.create({
          id: nextId,
          clientId: 'webapp',
          clientSecret: 'secret',
          secret: 'secret',
          accessTokenExpiration: 86400,
          refreshTokenExpiration: 604800,
          authCodeExpiration: 600,
        });
      }

      // 4. Ensure all existing users have defaultTenantId, authClientIds, and userTenant
      const users = await this.userRepo.find();
      for (const u of users) {
        let updated = false;
        const toUpdate: Record<string, any> = {};

        if (!u.defaultTenantId) {
          toUpdate.defaultTenantId = tenant.id;
          updated = true;
        }
        if (!u.authClientIds || (u.authClientIds as any).length === 0) {
          toUpdate.authClientIds = `{${client.id}}`;
          updated = true;
        }

        if (updated && u.id) {
          await this.userRepo.updateById(u.id, toUpdate);
        }

        if (u.id) {
          const existingUt = await this.userTenantRepo.findOne({
            where: {userId: u.id},
          });
          if (!existingUt) {
            await this.userTenantRepo.create({
              id: uuidv4(),
              userId: u.id,
              tenantId: tenant.id,
              roleId: role.id,
              status: UserStatus.ACTIVE,
            });
          }
        }
      }
    } catch (err) {
      console.error('Error during AuthSeedObserver initialization:', err);
    }
  }
}
