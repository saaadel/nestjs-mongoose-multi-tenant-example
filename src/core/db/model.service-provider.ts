import { ModelDefinition } from './model-definition.interface';
import { Connection, Model, Schema } from 'mongoose';
import { TenantService } from '../tenant.service';
import { DATABASE_CONNECTION } from './db-connection.provider';
import { Scope } from '@nestjs/common';

export interface ModelService {
  getModelAsync(): Promise<Model<any>>;
}

export function convertModelDefinitionToProvider(def: ModelDefinition) {
  return {
    provide: def.name,
    useFactory: def.skipTenant ? tenantlessFactory(def) : tenantfulFactory(def),
    inject: [DATABASE_CONNECTION, TenantService],
    scope: Scope.REQUEST,
  };
}

function tenantlessFactory(
  def: ModelDefinition,
): (connection: Connection, service: TenantService) => Promise<ModelService> {
  return async (connection: Connection, service: TenantService) => {
    const schema = def.schema;

    const model = connection.model(def.name, schema);

    const modelService: ModelService = {
      async getModelAsync() {
        return model;
      },
    };

    return modelService;
  };
}

function tenantfulFactory(
  def: ModelDefinition,
): (connection: Connection, service: TenantService) => Promise<ModelService> {
  return async (connection: Connection, service: TenantService) => {
    const schema = def.schema;

    schema.add({
      tenantId: {
        type: String,
        index: true,
      },
    });

    schema.set('discriminatorKey', 'tenantId');
    const model = connection.model(def.name, schema);

    const modelService: ModelService = {
      async getModelAsync() {
        // get tenantId from the request if filled via src\core\auth\jwt.strategy.ts - if current method has been marked with JwtAuthGuard)
        // returns UNDEFINED if current method has NOT been marked with JwtAuthGuard
        const tenantId: string | undefined = await service.getTenantId();

        // const discriminatorName = `${model.modelName}-${tenantId}`;
        const discriminatorName = `${tenantId}`;
        const existingDiscriminator = (model.discriminators || {})[
          discriminatorName
        ];
        const modelForTenantId =
          existingDiscriminator ||
          model.discriminator(discriminatorName, new Schema({}));

        return modelForTenantId;
      },
    };

    return modelService;
  };
}
