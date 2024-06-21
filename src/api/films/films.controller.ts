import { Crud, Override } from '@dataui/crud';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Film } from './entities/film.entity';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFilmDto, FileUploadDto } from './film.dto';
import { FilmsService } from './films.service';

@ApiTags('films')
@Controller('films')
@Crud({
  model: {
    type: Film,
  },
  dto: {
    create: CreateFilmDto,
  },
})
export class FilmsController {
  constructor(public service: FilmsService) {}
  @Override('createOneBase')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateFilmDto,
  })
  createFilm(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFilmDto,
  ) {
    console.log(file);
    console.log(dto);
    return this.service.createOneFilm(dto, file);
  }
}
