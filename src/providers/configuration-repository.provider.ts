import { Provider } from '@nestjs/common';
import { ConfigurationRepository } from 'src/providers/configuration.repository';

export const ConfigurationRepositoryProvider: Provider = {
  provide: 'ConfigurationRepositoryInterface',
  useClass: ConfigurationRepository,
};
