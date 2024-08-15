import { Controller, Get, Post, Put, Delete, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdateConfigurationDto } from 'src/dto/update-configuration.dto';
import { ConfigurationService } from 'src/providers/configuration.service';
import { Configuration } from 'src/schemas/configuration.schema';


@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configService: ConfigurationService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createConfiguration( @Body() dto: UpdateConfigurationDto ): Promise<{ message: string; configuration: Configuration }> {
    return await this.configService.createConfigurations(dto);
  }

  @Put()
  @UsePipes(new ValidationPipe())
  async updateConfiguration( @Body() dto: UpdateConfigurationDto ): Promise<{ message: string; configuration: Configuration }> {
    return await this.configService.updateConfigurations(dto);
  }

  @Get()
  async getConfigurations( @Query('androidVersion') androidVersion?: string ): Promise<Configuration | Configuration[]> {
    if (androidVersion) {
      return await this.configService.getConfigurationByAndroidVersion(androidVersion);
    }
    return await this.configService.getAllConfigurations();
  }

  @Delete(':id')
  async deleteConfiguration(@Param('id') id: string): Promise<{ message: string }> {
    return await this.configService.deleteConfiguration(id);
  }
}
