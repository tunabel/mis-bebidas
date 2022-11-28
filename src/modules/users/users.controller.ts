import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body);
  }
}
