import DepartmentRoutes from './Department.js';
import JobGroupRoutes from './JobGroup.js';
import JobTitleRoutes from './JobTitle.js';
import LeaveTypeRoutes from './LeaveType.js';
import PayrollSettingRoutes from './PayrollSetting.js';
import PublicHolidayRoutes from './PublicHoliday.js';
import StatutoryRateRoutes from './StatutoryRate.js';
import WorkShiftRoutes from './WorkShift.js';
import WorkerUnionRoutes from './WorkerUnion.js';

export default [
  ...DepartmentRoutes,
  ...JobGroupRoutes,
  ...JobTitleRoutes,
  ...LeaveTypeRoutes,
  ...PayrollSettingRoutes,
  ...PublicHolidayRoutes,
  ...StatutoryRateRoutes,
  ...WorkShiftRoutes,
  ...WorkerUnionRoutes
];