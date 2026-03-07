
import { departmentRoutes } from "./routers/departmentRouter.js";
import { searchDropdownRoutes } from "./routers/searchDropdownRouter.js";
import { jobGroupRoutes } from "./routers/jobGroupRouter.js";
import { jobTitleRoutes } from "./routers/jobTitleRouter.js";
import { leaveTypeRoutes } from "./routers/leaveTypeRouter.js";
import { payrollSettingRoutes } from "./routers/payrollSettingRouter.js";
import { publicHolidayRoutes } from "./routers/publicHolidayRouter.js";
import { statutoryRateRoutes } from "./routers/statutoryRateRouter.js";
import { workShiftRoutes } from "./routers/workShiftRouter.js";
import { workerUnionRoutes } from "./routers/workerUnionRouter.js";

export const hrRoutes = [
  ...departmentRoutes,
  ...searchDropdownRoutes,
  ...jobGroupRoutes,
  ...jobTitleRoutes,
  ...leaveTypeRoutes,
  ...payrollSettingRoutes,
  ...publicHolidayRoutes,
  ...statutoryRateRoutes,
  ...workShiftRoutes,
  ...workerUnionRoutes,
];