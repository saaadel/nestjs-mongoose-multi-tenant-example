import { ModelDefinition } from '../model-definition.interface';
import { Schema } from 'mongoose';

export const SampleModelDefinition: ModelDefinition = {
  name: 'SampleModel',
  skipTenant: false,

  schema: new Schema({
    id: {
      type: Number,
      default: Date.now(),
    },
    title: {
      type: String,
    },
  }),
};

export interface SampleType {
  id: number;
  title: string;
}
