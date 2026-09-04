import {repository} from '@loopback/repository';
import {post, requestBody, HttpErrors} from '@loopback/rest';
import {
  UserRepository,
  UserCredentialsRepository,
  AuthClientRepository,
  TenantRepository,
  RoleRepository,
  UserTenantRepository,
} from '@sourceloop/authentication-service';
import {TenantStatus, UserStatus} from '@sourceloop/core';
import {v4 as uuidv4} from 'uuid';
import * as bcrypt from 'bcrypt';

export class UserSignupController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(UserCredentialsRepository)
    public userCredentialsRepository: UserCredentialsRepository,
    @repository(AuthClientRepository)
    public authClientRepository: AuthClientRepository,
    @repository(TenantRepository)
    public tenantRepository: TenantRepository,
    @repository(RoleRepository)
    public roleRepository: RoleRepository,
    @repository(UserTenantRepository)
    public userTenantRepository: UserTenantRepository,
  ) {}

  @post('/auth/signup')
  async signup(
    @requestBody()
    body: any,
  ): Promise<{success: boolean; message: string}> {
    const rawUsername = body.username || body.userData?.username;
    const rawEmail = body.email || body.userData?.email;
    const rawPassword = body.password || body.userData?.password;
    const firstName = body.firstName || body.userData?.firstName || rawUsername;

    if (!rawUsername || !rawEmail || !rawPassword) {
      throw new HttpErrors.BadRequest('Username, email, and password are required.');
    }

    const username = String(rawUsername).trim().toLowerCase();
    const email = String(rawEmail).trim().toLowerCase();

    // 1. Check if user already exists in auth.users
    const existingUser = await this.userRepository.findOne({
      where: {
        or: [{email}, {username}],
      },
    });

    if (existingUser) {
      if (existingUser.email?.toLowerCase() === email) {
        throw new HttpErrors.BadRequest('A user with this email already exists.');
      }
      throw new HttpErrors.BadRequest('A user with this username already exists.');
    }

    // 2. Ensure tenant, role, and auth_client exist
    let tenant = await this.tenantRepository.findOne({where: {key: 'master'}});
    if (!tenant) {
      tenant = await this.tenantRepository.create({
        id: uuidv4(),
        name: 'Master Tenant',
        key: 'master',
        status: TenantStatus.ACTIVE,
      });
    }

    let role = await this.roleRepository.findOne({where: {tenantId: tenant.id}});
    if (!role) {
      role = await this.roleRepository.create({
        id: uuidv4(),
        name: 'User',
        tenantId: tenant.id,
        roleType: 0,
        permissions: ['*'],
      });
    }

    let client = await this.authClientRepository.findOne({where: {clientId: 'webapp'}});
    if (!client) {
      const lastClient = await this.authClientRepository.find({
        order: ['id DESC'],
        limit: 1,
      });
      const nextId = (lastClient[0]?.id ?? 0) + 1;
      client = await this.authClientRepository.create({
        id: nextId,
        clientId: 'webapp',
        clientSecret: 'secret',
        secret: 'secret',
        accessTokenExpiration: 86400,
        refreshTokenExpiration: 604800,
        authCodeExpiration: 600,
      });
    }

    const userId = uuidv4();

    // 3. Insert into auth.users table
    await this.userRepository.createWithoutPassword({
      id: userId,
      username: username,
      email: email,
      firstName: String(firstName),
      defaultTenantId: tenant.id,
      authClientIds: `{${client.id}}`,
    });

    // 4. Insert into auth.user_credentials table with hashed password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(String(rawPassword), saltRounds);

    await this.userCredentialsRepository.create({
      id: uuidv4(),
      userId: userId,
      authProvider: 'internal',
      authId: username,
      password: hashedPassword,
    });

    // 5. Insert into auth.user_tenants table
    await this.userTenantRepository.create({
      id: uuidv4(),
      userId: userId,
      tenantId: tenant.id,
      roleId: role.id,
      status: UserStatus.ACTIVE,
    });

    return {
      success: true,
      message: 'Account created successfully! You can now log in.',
    };
  }
}
