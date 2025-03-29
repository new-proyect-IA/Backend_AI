import { IsInt, IsOptional, IsString } from 'class-validator';

export class ProsCornDiscusserDto {
  @IsString()
  readonly prompt: string;

  @IsInt()
  @IsOptional()
  readonly maxTokens?: number;
}