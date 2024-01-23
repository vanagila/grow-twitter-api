import { BcryptAdapter, JWTAdapter } from "../adapters";
import { repository } from "../database/prisma.connection";
import { ResponseDTO, UserLoginDTO } from "../dtos";
import { envs } from "../envs";

export class AuthService {
  /**
   * Performs user login.
   *
   * @remarks
   * This method checks if the provided username and password matches with the stored credentials. If the provided data is not found or does not match, it returns a 401 response. In case it is successful, generates a JWT token.
   *
   * @param bodyData - The login credentials.

   * @returns A promise in the REST pattern according to the applied logic.
   *
   * @author Vanagila Xavier Rodrigues <vanagilakedna@gmail.com>
   */
  public async login(bodyData: UserLoginDTO): Promise<ResponseDTO> {
    const userFound = await repository.user.findUnique({
      where: {
        username: bodyData.username,
      },
    });

    if (!userFound) {
      return {
        code: 401,
        ok: false,
        message: "Dados invalidos",
      };
    }

    const bcrypt = new BcryptAdapter(Number(envs.BCRYPT_SALT));
    const matches = await bcrypt.matchesHash(
      bodyData.password,
      userFound.password
    );

    if (!matches) {
      return {
        code: 401,
        ok: false,
        message: "Dados invalidos",
      };
    }

    const payloadToken = {
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
    };
    const jwt = new JWTAdapter(envs.JWT_SECRET_KEY, envs.JWT_EXPIRE_IN);
    const token = jwt.generateToken(payloadToken);

    return {
      code: 200,
      ok: true,
      message: "Login feito com sucesso",
      data: { token, user: payloadToken },
    };
  }
}
