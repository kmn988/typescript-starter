import { ApiProperty } from '@dataui/crud/lib/crud';
import { IsDate, IsDateString, IsInt } from 'class-validator';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
export class CreateFilmDto extends FileUploadDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsDateString()
  releasedAt: string;

  @ApiProperty()
  //   @IsInt()
  rating: number;
}
