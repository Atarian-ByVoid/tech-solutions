import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserDTO } from 'src/user/user.dto';

export class AuthUserDTO extends PickType(UserDTO, ['email', 'password']) {}

export class BearerTokenDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bearerToken: string;
}

export class JWTPayloadDTO extends PickType(UserDTO, ['id', 'email']) {
  constructor(user: User) {
    super();

    this.id = user.id;
    this.email = user.email;
    
    
  }
}
