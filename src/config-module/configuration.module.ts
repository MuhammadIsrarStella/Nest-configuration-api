import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationService } from '../providers/configuration.service';
import { ConfigurationController } from '../controller/configuration.controller';
import { ConfigurationRepository } from '../providers/configuration.repository';
import { Configuration, ConfigurationSchema } from '../schemas/configuration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Configuration.name, schema: ConfigurationSchema }]),
  ],
  controllers: [ConfigurationController],
  providers: [
    ConfigurationService,
    ConfigurationRepository,
  ],
})
export class ConfigurationModule {}
