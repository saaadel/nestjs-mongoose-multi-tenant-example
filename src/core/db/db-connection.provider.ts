import * as mongoose from 'mongoose';
import { Provider } from '@nestjs/common';

const mongoDbConnectionUrl =
  process.env.MONGO_CONNECTION_URL || 'mongodb://localhost/test';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
export const DbConnectionProvider: Provider = {
  provide: DATABASE_CONNECTION,
  useValue: mongoose.createConnection(mongoDbConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
};

mongoose.set('useCreateIndex', true);
