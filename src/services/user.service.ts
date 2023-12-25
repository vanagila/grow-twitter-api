import { User as UserPrisma } from "@prisma/client";
import { BcryptAdapter } from "../adapters";
import { repository } from "../database/prisma.connection";
import { ResponseDTO, UserRegisterDTO } from "../dtos";
import { envs } from "../envs";
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
        message: "E-mail ja cadastrado",
      };
    }

    const bcrypt = new BcryptAdapter(Number(envs.BCRYPT_SALT));
    const hash = await bcrypt.generateHash(bodyData.password);

    const newUser = await repository.user.create({
      data: {
        name: bodyData.name,
        username: bodyData.username,
        email: bodyData.email,
        password: hash,
      },
    });

    return {
      code: 201,
      ok: true,
      message: "Usuario cadastrado",
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
