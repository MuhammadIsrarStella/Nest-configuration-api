import { Controller, Get, Post, Put, Body, Query, UsePipes } from '@nestjs/common';
import { ConfigurationService } from '../providers/configuration.service';
import { UpdateConfigurationDto } from '../dto/update-configuration.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Configuration } from '../schemas/configuration.schema';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configService: ConfigurationService) {}

  // POST endpoint for creating a new configuration
  @Post()
  @UsePipes(new ValidationPipe())
  async createConfiguration(
    @Body() dto: UpdateConfigurationDto,
  ): Promise<Configuration> {
    console.log('POST request received');
    return this.configService.createConfiguration(dto);
  }

  // PUT endpoint for updating an existing configuration
  @Put()
  @UsePipes(new ValidationPipe())
  async updateConfiguration(
    @Body() dto: UpdateConfigurationDto,
  ): Promise<Configuration> {
    console.log('PUT request received');
    return this.configService.updateConfiguration(dto);
  }

  // GET endpoint for retrieving configurations
  @Get()
  async getConfigurations(
    @Query('androidVersion') androidVersion?: string,
  ): Promise<Configuration | Configuration[]> {
    if (androidVersion) {
      return this.configService.getConfigurationByAndroidVersion(androidVersion);
    }
    return this.configService.getAllConfigurations();
  }
}
