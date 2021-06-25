import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../../repositories/TagsRepositories";

class CreateTagService {
  async execute(name: string) {
    const tagsRepository = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error("Não e permitido cadastrar tag sem nome");
    }

    const TagAlreadyExists = await tagsRepository.findOne({
      name,
    });

    if (TagAlreadyExists) {
      throw new Error(
        "Não e permitido cadastrar mais de uma tag com o mesmo nome"
      );
    }

    const tag = tagsRepository.create({
      name,
    });

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
