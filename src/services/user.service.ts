import { User as UserPrisma } from "@prisma/client";
import { repository } from "../database/prisma.connection";
import { ResponseDTO, UserRegisterDTO } from "../dtos";
import { User } from "../models";

export class UserService {
  public async register(bodyData: UserRegisterDTO): Promise<ResponseDTO> {
    const emailAlreadyinUse = await repository.user.findUnique({
      where: { email: bodyData.email },
    });

    if (emailAlreadyinUse) {
      return {
        code: 400,
        ok: false,
        mensage: "E-mail ja cadastrado",
      };
    }

    const newUser = await repository.user.create({
      data: {
        name: bodyData.name,
        username: bodyData.username,
        email: bodyData.email,
        password: bodyData.password,
      },
    });

    return {
      code: 201,
      ok: true,
      mensage: "Usuario cadastrado",
      data: this.mapToModel({ ...newUser }),
    };
  }

  private mapToModel(userDB: UserPrisma): User {
    return new User(
      userDB.id,
      userDB.name,
      userDB.username,
      userDB.email,
      userDB.password
    );
  }
}
