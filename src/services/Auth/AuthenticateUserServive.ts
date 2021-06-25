import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import {IAuthenticationRequest} from './Status';


class AuthenticateUserService {
  async execute({ email, password }: IAuthenticationRequest) {
    const userRepositories = getCustomRepository(UsersRepositories);

    // Verificar se email existe
    const user = await userRepositories.findOne({ email });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    // Verficar se senha está correta
    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new Error("Email/Password incorrect");
    }
    // Gerar token
    const token = sign(
      {
        email: user.email,
      },
      "87a9e0fb362503a768d2d690da475314",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
