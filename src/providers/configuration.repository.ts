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
    return this.configModel.findOne({ androidVersion }).exec();
  }

  async create(configuration: Partial<Configuration>): Promise<Configuration> {
    const newConfig = new this.configModel(configuration);
    return newConfig.save();
  }

  async getAll(): Promise<Configuration[]> {
    return this.configModel.find().exec();
  }

  async deleteById(id: string): Promise<{ deletedCount: number }> {
    return this.configModel.deleteOne({ _id: id }).exec();
  }
}
