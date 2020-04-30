import { Injectable } from '@nestjs/common';

export interface IUser {
  userId: string;
  tenantId: string;
}

@Injectable()
export class AuthService {
  async authorize(userId: string): Promise<IUser | undefined> {
    // fake via DB
    return userId === '123' || userId === '321' ? { userId, tenantId: `Tenant${userId}` } : undefined;
  }
}
