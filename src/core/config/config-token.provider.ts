import { Provider } from '@nestjs/common';

export const CONFIG_TOKEN = 'CONFIG_TOKEN';
export const ConfigTokenProvider: Provider = {
  provide: CONFIG_TOKEN,
  useValue: {
    secretKey: 'SECRET!!!',
  },
};
