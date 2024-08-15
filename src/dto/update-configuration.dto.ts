import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class UpdateConfigurationDto {
  @IsString()
  @IsNotEmpty()
  androidVersion: string;

  @IsString()
  @IsNotEmpty()
  webVersion: string;

  @IsDateString()
  @IsNotEmpty()
  dateTime: string;
}
