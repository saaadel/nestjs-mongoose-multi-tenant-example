import { Module, Provider, ValueProvider } from '@nestjs/common';
import { DbConnectionProvider } from './db/db-connection.provider';
import { SampleModelDefinition } from './db/model-defs/sample.model-def';
import { TenantService } from './tenant.service';
import { convertModelDefinitionToProvider } from './db/model.service-provider';
import { ConfigTokenProvider } from './config/config-token.provider';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthService } from './auth/auth.service';

const modelProviders: Provider[] = [];
[
  SampleModelDefinition, //
  // more models here
].forEach(def => modelProviders.push(convertModelDefinitionToProvider(def)));

@Module({
  imports: [
    JwtModule.register({
      secret: (ConfigTokenProvider as ValueProvider).useValue.secretKey,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  providers: [
    ConfigTokenProvider, //
    DbConnectionProvider,

    // TenantDbService,

    TenantService,

    JwtStrategy,
    AuthService,

    ...modelProviders,
  ],
  exports: [
    // TenantDbService, //

    TenantService,

    ...modelProviders
  ],
})
export class CoreModule { }
