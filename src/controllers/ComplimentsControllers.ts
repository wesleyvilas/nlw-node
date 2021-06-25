import { Request, Response } from "express";
import { CreateComplimentService } from "../services/Compliments/CreateComplimentService";
import { ListUserRComplimentsService } from "../services/Compliments/ListUserRComplimentsService";
import { ListUserSComplimentsService } from "../services/Compliments/ListUserSComplimentsService";

class CreateCompliment {
  async handle(request: Request, response: Response) {
    const { tag_id, user_r, message } = request.body;
    const { user_id } = request;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_s: user_id,
      user_r,
      message,
    });

    return response.json(compliment);
  }
}

class ListUsersComlimentsR {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const listUserRCompliments = new ListUserRComplimentsService();

    const compliments = await listUserRCompliments.execute(user_id);

    return response.json(compliments);
  }
}

class ListUsersComplimentsS {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const listUserSendCompliments = new ListUserSComplimentsService();

    const compliments = await listUserSendCompliments.execute(user_id);

    return response.json(compliments);
  }
}

export { CreateCompliment, ListUsersComlimentsR, ListUsersComplimentsS };
