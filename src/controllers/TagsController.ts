import { Request, Response } from "express";
import { CreateTagService } from "../services/Tags/CreateTagService";
import { ListTagsService } from "../services/Tags/ListTagsService";

class CreateTag {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const create = new CreateTagService();

    const tag = await create.execute(name);

    return response.json(tag);
  }
}

class ListTags {
  async handle(request: Request, response: Response) {
    const listTagsService = new ListTagsService();

    const tags = await listTagsService.execute();

    return response.json(tags);
  }
}

export { CreateTag, ListTags };
