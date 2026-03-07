
import { permissionRoutes } from "./routers/permissionRouter.js";
import { roleRoutes } from "./routers/roleRouter.js";
import { groupRoutes } from "./routers/groupRouter.js";
import { ruleRoutes } from "./routers/ruleRouter.js";
import { userRoutes } from "./routers/userRouter.js";

export const iamRoutes = [
  ...permissionRoutes,
  ...roleRoutes,
  ...groupRoutes,
  ...ruleRoutes,
  ...userRoutes,
];