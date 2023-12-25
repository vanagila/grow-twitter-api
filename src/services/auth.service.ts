import { BcryptAdapter, JWTAdapter } from "../adapters";
import { repository } from "../database/prisma.connection";
import { ResponseDTO, UserLoginDTO } from "../dtos";
import { envs } from "../envs";

export class AuthService {
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

    const jwt = new JWTAdapter(envs.JWT_SECRET_KEY, envs.JWT_EXPIRE_IN);
    const token = jwt.generateToken(userFound);

    return {
      code: 200,
      ok: true,
      message: "Login feito com sucesso",
      data: { token },
    };
  }
}
