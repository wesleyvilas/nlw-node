import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../../repositories/ComplimentsRepositories";

class ListUserRComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = await getCustomRepository(
      ComplimentsRepositories
    );

    const compliments = await complimentsRepositories.find({
      where: {
        user_r: user_id,
      },
      relations: ["UserS", "UserR", "tag"],
    });

    return compliments;
  }
}
export { ListUserRComplimentsService };
