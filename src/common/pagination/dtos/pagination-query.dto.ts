import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  limit: number = 10;
}
