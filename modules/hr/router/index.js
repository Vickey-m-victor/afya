import DashboardRoutes from './Dashboard.js';
import DepartmentRoutes from './Department.js';
import DependentRelationshipTypeRoutes from './DependentRelationshipType.js';
import DocumentTypeRoutes from './DocumentType.js';
import EducationLevelRoutes from './EducationLevel.js';
import EmployeeRoutes from './Employee.js';
import EmployerTypeRoutes from './EmployerType.js';
import EmploymentStatusRoutes from './EmploymentStatus.js';
import EmploymentTypeRoutes from './EmploymentType.js';
import JobGroupRoutes from './JobGroup.js';
import JobTitleRoutes from './JobTitle.js';
import LeaveTypeRoutes from './LeaveType.js';
import PayrollSettingRoutes from './PayrollSetting.js';
import PublicHolidayRoutes from './PublicHoliday.js';
import ResidentialStatusRoutes from './ResidentialStatus.js';
import StatutoryRateRoutes from './StatutoryRate.js';
import WorkShiftRoutes from './WorkShift.js';
import WorkerUnionRoutes from './WorkerUnion.js';

export default [
  ...DashboardRoutes,
  ...DepartmentRoutes,
  ...DependentRelationshipTypeRoutes,
  ...DocumentTypeRoutes,
  ...EducationLevelRoutes,
  ...EmployeeRoutes,
  ...EmployerTypeRoutes,
  ...EmploymentStatusRoutes,
  ...EmploymentTypeRoutes,
  ...JobGroupRoutes,
  ...JobTitleRoutes,
  ...LeaveTypeRoutes,
  ...PayrollSettingRoutes,
  ...PublicHolidayRoutes,
  ...ResidentialStatusRoutes,
  ...StatutoryRateRoutes,
  ...WorkShiftRoutes,
  ...WorkerUnionRoutes
];