import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../../repositories/UsersRepositories";

import { IComplimentRequest } from "./Status";

class CreateComplimentService {
  async execute({ tag_id, user_s, user_r, message }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const userRepositories = getCustomRepository(UsersRepositories);

    if (user_s === user_r) {
      throw new Error("Incorrect user Receiver");
    }

    const userRExists = await userRepositories.findOne(user_r);

    if (!userRExists) {
      throw new Error("User Receiver does not exists");
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_s,
      user_r,
      message,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
