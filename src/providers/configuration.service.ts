import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ConfigurationRepository } from './configuration.repository';
import { UpdateConfigurationDto } from 'src/dto/update-configuration.dto';
import { Configuration } from 'src/schemas/configuration.schema';


@Injectable()
export class ConfigurationService {
  constructor(private readonly configRepository: ConfigurationRepository) {}

  async createConfigurations(dto: UpdateConfigurationDto): Promise<{ message: string; configuration: Configuration }> {
    const existingConfig = await this.configRepository.findByAndroidVersion(dto.androidVersion);

    if (existingConfig) {
      throw new ConflictException(
        `Configuration with Android version ${dto.androidVersion} already exists. ` +
        `Please add another record or update this record if you want.`
      );
    }

    const newConfig = await this.configRepository.create({
      androidVersion: dto.androidVersion,
      webVersion: dto.webVersion,
      dateTime: new Date(dto.dateTime),
    });

    return {
      message: 'Configuration created successfully',
      configuration: newConfig,
    };
  }

  async updateConfigurations(dto: UpdateConfigurationDto): Promise<{ message: string; configuration: Configuration }> {
    const existingConfig = await this.configRepository.findByAndroidVersion(dto.androidVersion);

    if (!existingConfig) {
      throw new NotFoundException(`Configuration with Android version ${dto.androidVersion} not found`);
    }

    existingConfig.webVersion = dto.webVersion;
    existingConfig.dateTime = new Date(dto.dateTime);
    const updatedConfig = await existingConfig.save();

    return {
      message: 'Configuration updated successfully',
      configuration: updatedConfig,
    };
  }

  async deleteConfiguration(id: string): Promise<{ message: string }> {
    const result = await this.configRepository.deleteByIdConfigurations(id);
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Configuration with ID ${id} not found`);
    }
    return { message: `Configuration with ID ${id} has been deleted successfully.` };
  }

  async getConfigurationByAndroidVersion(androidVersion: string): Promise<Configuration> {
    const config = await this.configRepository.findByAndroidVersion(androidVersion);
    if (!config) {
      throw new NotFoundException(`Configuration with Android version ${androidVersion} not found`);
    }
    return config;
  }

  async getAllConfigurations(): Promise<Configuration[]> {
    return await this.configRepository.getAllConfigurations();
  }
}
