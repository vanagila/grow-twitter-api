import { User as UserPrisma } from "@prisma/client";
import { BcryptAdapter } from "../adapters";
import { repository } from "../database/prisma.connection";
import { ResponseDTO, UserRegisterDTO } from "../dtos";
import { envs } from "../envs";
import { User } from "../models";

export class UserService {
  /**
   * Registers a new user.
   *
   * @remarks
   * This method checks if the provided email is already in use. It uses bcrypt to generate a hash of the password.
   *
   * @param bodyData - The user data to be registered.

   * @returns A promise in the REST pattern according to the applied logic
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
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
