
import { accessLogRoutes } from "./routers/accessLogRouter.js";
import { auditTrailRoutes } from "./routers/auditTrailRouter.js";
import { errorLogRoutes } from "./routers/errorLogRouter.js";
import { facilitieRoutes } from "./routers/facilitieRouter.js";
import { searchDropdownRoutes } from "./routers/searchDropdownRouter.js";
import { settingsGeneralRoutes } from "./routers/settingsGeneralRouter.js";
import { settingsMailerRoutes } from "./routers/settingsMailerRouter.js";
import { settingsThemeRoutes } from "./routers/settingsThemeRouter.js";
import { settingsSecurityRoutes } from "./routers/settingsSecurityRouter.js";
import { taskManagerRoutes } from "./routers/taskManagerRouter.js";

export const adminRoutes = [
  ...accessLogRoutes,
  ...auditTrailRoutes,
  ...errorLogRoutes,
  ...facilitieRoutes,
  ...searchDropdownRoutes,
  ...settingsGeneralRoutes,
  ...settingsMailerRoutes,
  ...settingsThemeRoutes,
  ...settingsSecurityRoutes,
  ...taskManagerRoutes,
];