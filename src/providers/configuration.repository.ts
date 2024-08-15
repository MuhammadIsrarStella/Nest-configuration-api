import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Configuration } from '../schemas/configuration.schema';

@Injectable()
export class ConfigurationRepository {
  constructor(
    @InjectModel(Configuration.name) private configModel: Model<Configuration>,
  ) {}

  // Find a configuration by Android version
  async findByAndroidVersion(androidVersion: string): Promise<Configuration> {
    return this.configModel.findOne({ androidVersion }).exec();
  }

  // Create a new configuration
  async create(configuration: Partial<Configuration>): Promise<Configuration> {
    const newConfig = new this.configModel(configuration);
    return newConfig.save();
  }

  // Get all configurations
  async getAll(): Promise<Configuration[]> {
    return this.configModel.find().exec();
  }
}
