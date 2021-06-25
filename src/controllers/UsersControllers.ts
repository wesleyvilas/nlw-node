import { Request, Response } from "express";
import { CreateUserService } from "../services/Users/CreateUserService";
import { ListUsersService } from "../services/Users/ListUsersService";

class CreateUser {
  async handle(request: Request, response: Response) {
    const { name, email, admin, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      admin,
      password,
    });

    return response.json(user);
  }
}

class ListUsers {
  async handle(request: Request, response: Response) {
    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute();

    return response.json(users);
  }
}

export { CreateUser, ListUsers };
