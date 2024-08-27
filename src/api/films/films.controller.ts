import { Crud, Override } from '@dataui/crud';
import {
  Body,
  Controller,
  Param,
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
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      categories: {
        eager: true,
        allow: ['id', 'name'],
      },
    },
  },
})
export class FilmsController {
  constructor(public service: FilmsService) {}
  @Override('createOneBase')
  @UseInterceptors(FileInterceptor('poster'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateFilmDto,
  })
  createFilm(
    @UploadedFile() poster: Express.Multer.File,
    @Body() dto: CreateFilmDto,
  ) {
    return this.service.createOneFilm(dto, poster);
  }

  @Override('updateOneBase')
  @UseInterceptors(FileInterceptor('poster'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateFilmDto,
  })
  updateFilm(
    @UploadedFile() poster: Express.Multer.File,
    @Body() dto: CreateFilmDto,
    @Param('id') id,
  ) {
    return this.service.updateOneFilm(id, dto, poster);
  }

  // @Override('getOneBase')
  // getFilm(@Param('id') id) {
  //   return this.service.getOneFilm(id);
  // }
}
