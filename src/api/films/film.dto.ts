import { IsArray, IsDateString, IsInt, IsString } from 'class-validator';
import { Category } from '../categories/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
export class CreateFilmDto extends FileUploadDto {
  @ApiProperty()
  @IsString()
  name: string;

  // @ApiProperty()
  // @IsDateString()
  // releasedAt: string;

  @ApiProperty({ type: 'float' })
  // @IsInt()
  rating: number;

  @ApiProperty({ type: 'array' })
  @IsArray()
  categories: string[];
}
