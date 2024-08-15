import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Configuration } from 'src/schemas/configuration.schema';

@Injectable()
export class ConfigurationRepository {
  constructor(
    @InjectModel(Configuration.name) private configModel: Model<Configuration>,
  ) {}

  async findByAndroidVersion(androidVersion: string): Promise<Configuration> {
    return await this.configModel.findOne({ androidVersion }).exec();
  }

  async create(configuration: Partial<Configuration>): Promise<Configuration> {
    const newConfig = new this.configModel(configuration);
    return newConfig.save();
  }

  async getAllConfigurations(): Promise<Configuration[]> {
    return await this.configModel.find().exec();
  }

  async deleteByIdConfigurations(id: string): Promise<{ deletedCount: number }> {
    return await this.configModel.deleteOne({ _id: id }).exec();
  }
}
