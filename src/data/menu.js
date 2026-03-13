/*
 * Main and demo navigation arrays
 *
 * 'to' attribute points to the route name, not the path url
 */

export default {
  main: [
    {
      name: "Dashboard",
      to: "dashboard",
      icon: "si si-speedometer",
    },
    {
      name: "IAM",
      heading: true,
    },

    {
      name: "RBAC",
      icon: "fa fa-shield-halved",
      subActivePaths: "/iam",
      sub: [
        {
      name: "Users",
      to: "iam/users",
      icon: "fa fa-users",
        },
        {
          name: "Roles",
          to: "iam/rbac/roles",
          icon: "fa fa-user-shield",
        },
        {
          name: "Permissions",
          to: "iam/rbac/permissions",
          icon: "fa fa-key",
        },
        {
          name: "Groups",
          to: "iam/rbac/groups",
          icon: "fa fa-user-group",
        },
        {
          name: "Rules",
          to: "iam/rbac/rules",
          icon: "fa fa-gavel",
        },
      ],
    },
    {
      name: "HR",
      heading: true,
    },
    {
      name: "Human Resources",
      icon: "fa fa-people-group",
      subActivePaths: "/hr",
      sub: [
        {
          name: "Dashboard",
          to: "hr",
          icon: "fa fa-tachometer-alt",
        },
        {
          name: "Departments",
          to: "hr/department",
          icon: "fa fa-building",
        },
        {
          name: "Job Groups",
          to: "hr/job-group",
          icon: "fa fa-layer-group",
        },
        {
          name: "Job Titles",
          to: "hr/job-title",
          icon: "fa fa-id-badge",
        },
        {
          name: "Leave Types",
          to: "hr/leave-type",
          icon: "fa fa-calendar-xmark",
        },
        {
          name: "Payroll Settings",
          to: "hr/payroll-setting",
          icon: "fa fa-money-check-dollar",
        },
        {
          name: "Public Holidays",
          to: "hr/public-holiday",
          icon: "fa fa-calendar-day",
        },
        {
          name: "Statutory Rates",
          to: "hr/statutory-rate",
          icon: "fa fa-percent",
        },
        {
          name: "Work Shifts",
          to: "hr/work-shift",
          icon: "fa fa-clock",
        },
        {
          name: "Worker Unions",
          to: "hr/worker-union",
          icon: "fa fa-handshake",
        },
      ],
    },
    {
      name: "Admin",
      heading: true,
    },
    {
      name: "Logs Management",
      icon: "fa fa-file-lines",
      subActivePaths: "/admin/logs",
      sub: [
        {
          name: "Access Logs",
          to: "admin/logs/access",
          icon: "fa fa-door-open",
        },
        {
          name: "Audit Trail",
          to: "admin/logs/audit",
          icon: "fa fa-clipboard-list",
        },
        {
          name: "Error Logs",
          to: "admin/logs/errors",
          icon: "fa fa-circle-exclamation",
        },
      ],
    },
    {
      name: "Task Manager",
      to: "admin/task-manager",
      icon: "fa fa-clock",
    },
    {
      name: "Settings",
      to: "admin/settings/general",
      icon: "fa fa-cog",
    },
    {
      name: "Tests",
      heading: true,
    },
    {
      name: "Tests",
      to: "tests/components",
      icon: "si si-settings",
    },
  ],


};
