import { ApiProperty, PickType } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

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

export class UpdateRoleDTO extends PickType(UserDTO, ['role']) {
  @ApiProperty({
    type: Role,
    enum: Role,
    description: 'O novo papel do usuario',
    example: Role.ADMIN,
  })
  @IsEnum(Role, { message: 'O papel do usuario deve ser um valor válido' })
  @IsNotEmpty({ message: 'O papel do usuario não pode ser vazio' })
  role: Role;
}
