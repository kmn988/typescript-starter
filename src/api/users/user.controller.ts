import { Crud, Override } from '@dataui/crud';
import { Body, Controller, ParseFilePipe, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from './user.dto';
import { UsersService } from './user.service';

@ApiTags('users')
@Controller('users')
@Crud({
  model: {
    type: User,
  },
  dto: {
    create: CreateUserDto,
  },
  query: {
    exclude: ['password', 'refreshToken'],
  },
})
export class UsersController {
  constructor(public service: UsersService) {}

  @Override('createOneBase')
  createUser(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto);
  }
}
