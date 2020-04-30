import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class TenantService {
  constructor(@Inject(REQUEST) protected readonly request: Request) { }

  async getTenantId(): Promise<string | undefined> {
    const requestWithUser = (this.request as unknown) as {
      user: { tenantId: string };
    };

    // get tenantId from user in request. User structure was filled in the src\core\auth\jwt.strategy.ts
    return requestWithUser?.user?.tenantId;
  }
}
