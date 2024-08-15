import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationModule } from './config-module/configuration.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-configurations', {
    
    }),
    ConfigurationModule,
  ],
})
export class AppModule {}
