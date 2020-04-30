import { Schema } from 'mongoose';

export interface ModelDefinition {
  name: string;
  skipTenant: boolean;
  schema: Schema;
}
