import { Router } from "express";

// Controllers
import { AuthenticateController } from "./controllers/AuthenticateController";

import { ListTags, CreateTag } from "./controllers/TagsController";
import { ListUsers, CreateUser } from "./controllers/UsersControllers";
import {
  CreateCompliment,
  ListUsersComlimentsR,
  ListUsersComplimentsS,
} from "./controllers/ComplimentsControllers";

// Ensure
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
const router = Router();

// Authenticate  Controller
const authUser = new AuthenticateController();

// Get Controllers
const createTag = new CreateTag();
const listTagsController = new ListTags();

const listUsers = new ListUsers();
const createUser = new CreateUser();

const createCompliment = new CreateCompliment();
const listUsersComlimentsR = new ListUsersComlimentsR();
const listUserSComplimentsS = new ListUsersComplimentsS();

router.post("/login", authUser.handle);

router.post("/users", createUser.handle);
router.get("/users", ensureAuthenticated, listUsers.handle);

router.post("/tags", ensureAuthenticated, ensureAdmin, createTag.handle);
router.get("/tags", ensureAuthenticated, listTagsController.handle);

router.post("/compliments", ensureAuthenticated, createCompliment.handle);
router.get(
  "/users/compliments/s",
  ensureAuthenticated,
  listUserSComplimentsS.handle
);
router.get(
  "/users/compliments/r",
  ensureAuthenticated,
  listUsersComlimentsR.handle
);

export { router };
