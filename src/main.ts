import * as customEnv from 'custom-env';
if (process.env.STAGE && process.env.STAGE.length) {
  customEnv.env(process.env.STAGE);
} else {
  customEnv.env();
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import {
  corsOrigins,
  corsMethods,
  corsRequestHeaders,
  corsResponseHeaders,
} from './cors';
import * as bodyParser from 'body-parser';

const HOST = '0.0.0.0';
const PORT = parseInt(process.env.PORT, 10) || 8080;

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('/api');
  app.enableCors({
    credentials: true,
    methods: corsMethods,
    origin: corsOrigins,
    allowedHeaders: [...corsRequestHeaders],
    exposedHeaders: [...corsResponseHeaders],
  });

  app.use(bodyParser.json({ limit: '100mb', type: 'application/json' }));
  app.use(
    bodyParser.urlencoded({
      limit: '100mb',
      type: 'application/json',
      extended: true,
      parameterLimit: 100000,
    }),
  );

  await app.listen(PORT, HOST).then(() => {
    // tslint:disable-next-line: no-console
    console.info(`** Nest Server is listening on ${HOST}:${PORT} **`);
  });
}
bootstrap();
