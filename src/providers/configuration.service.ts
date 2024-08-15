import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigurationRepository } from './configuration.repository';
import { UpdateConfigurationDto } from '../dto/update-configuration.dto';
import { Configuration } from '../schemas/configuration.schema';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configRepository: ConfigurationRepository) {}

  // Create a new configuration
  async createConfiguration(dto: UpdateConfigurationDto): Promise<Configuration> {
    return this.configRepository.create({
      androidVersion: dto.androidVersion,
      webVersion: dto.webVersion,
      dateTime: new Date(dto.dateTime),
    });
  }

  // Update an existing configuration
  async updateConfiguration(dto: UpdateConfigurationDto): Promise<Configuration> {
    const existingConfig = await this.configRepository.findByAndroidVersion(dto.androidVersion);

    if (!existingConfig) {
      throw new NotFoundException(`Configuration with Android version ${dto.androidVersion} not found`);
    }

    existingConfig.webVersion = dto.webVersion;
    existingConfig.dateTime = new Date(dto.dateTime);
    return existingConfig.save();
  }

  // Get a specific configuration by Android version
  async getConfigurationByAndroidVersion(androidVersion: string): Promise<Configuration> {
    const config = await this.configRepository.findByAndroidVersion(androidVersion);
    if (!config) {
      throw new NotFoundException(`Configuration with Android version ${androidVersion} not found`);
    }
    return config;
  }

  // Get all configurations
  async getAllConfigurations(): Promise<Configuration[]> {
    return this.configRepository.getAll();
  }
}
